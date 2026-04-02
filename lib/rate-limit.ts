/**
 * In-memory rate limiter — no external dependencies.
 * Each limiter tracks requests per IP in a Map with automatic cleanup.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  readonly maxRequests: number;
  readonly windowMs: number;
}

const limiters = new Map<string, Map<string, RateLimitEntry>>();

// Cleanup expired entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const store of limiters.values()) {
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }
}, 60_000);

export function rateLimit(name: string, options: RateLimiterOptions) {
  if (!limiters.has(name)) {
    limiters.set(name, new Map());
  }
  const store = limiters.get(name)!;

  return {
    check(ip: string): { allowed: boolean; remaining: number; retryAfterMs: number } {
      const now = Date.now();
      const entry = store.get(ip);

      if (!entry || now > entry.resetAt) {
        store.set(ip, { count: 1, resetAt: now + options.windowMs });
        return { allowed: true, remaining: options.maxRequests - 1, retryAfterMs: 0 };
      }

      if (entry.count >= options.maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterMs: entry.resetAt - now,
        };
      }

      store.set(ip, { ...entry, count: entry.count + 1 });
      return {
        allowed: true,
        remaining: options.maxRequests - entry.count - 1,
        retryAfterMs: 0,
      };
    },
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

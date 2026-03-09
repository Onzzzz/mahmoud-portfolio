import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ═══════════════════════════════════════════════════════════
// Live Visitor Tracking — In-Memory Store + IP Geolocation
// Tracks active visitors, detects city/country via IP
// Persists total count to disk so it survives restarts
// ═══════════════════════════════════════════════════════════

// ── Types ────────────────────────────────────────────────
interface VisitorEntry {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  lastSeen: number;
  firstSeen: number;
}

interface PersistedStats {
  totalAllTime: number;
  lastUpdated: string;
}

// ── Persistent stats file ────────────────────────────────
const STATS_FILE = join(process.cwd(), ".visitor-stats.json");

function loadStats(): PersistedStats {
  try {
    if (existsSync(STATS_FILE)) {
      return JSON.parse(readFileSync(STATS_FILE, "utf-8"));
    }
  } catch { /* ignore corrupt file */ }
  return { totalAllTime: 0, lastUpdated: new Date().toISOString() };
}

function saveStats(stats: PersistedStats) {
  try {
    writeFileSync(STATS_FILE, JSON.stringify(stats));
  } catch { /* ignore write errors */ }
}

// ── In-Memory Store (persists across requests in standalone mode) ──
const visitors = new Map<string, VisitorEntry>();
const persistedStats = loadStats();
let totalVisitsToday = 0;
let dayKey = new Date().toISOString().slice(0, 10);

// ── IP Hashing (privacy: never store raw IPs) ────────────
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return "v" + Math.abs(hash).toString(36);
}

// ── Geolocation Lookup ───────────────────────────────────
async function geolocate(ip: string): Promise<VisitorEntry | null> {
  const now = Date.now();

  // Primary: ip-api.com (HTTP only, 45/min free)
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,city,country,countryCode,lat,lon`,
      { signal: AbortSignal.timeout(3000) }
    );
    const data = await res.json();
    if (data.status === "success" && data.city) {
      return {
        city: data.city,
        country: data.country,
        countryCode: data.countryCode,
        lat: data.lat,
        lng: data.lon,
        lastSeen: now,
        firstSeen: now,
      };
    }
  } catch {
    /* fall through to fallback */
  }

  // Fallback: ipapi.co (HTTPS, 1000/day free)
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    if (data.city && !data.error) {
      return {
        city: data.city,
        country: data.country_name,
        countryCode: data.country_code,
        lat: data.latitude,
        lng: data.longitude,
        lastSeen: now,
        firstSeen: now,
      };
    }
  } catch {
    /* give up */
  }

  return null;
}

// ── Prune stale entries (older than 15 minutes) ──────────
function pruneStale() {
  const cutoff = Date.now() - 15 * 60 * 1000;
  for (const [key, entry] of visitors) {
    if (entry.lastSeen < cutoff) {
      visitors.delete(key);
    }
  }
}

// ── Reset daily counter at midnight ──────────────────────
function checkDayReset() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    totalVisitsToday = 0;
  }
}

// ── Rate limiting for geo lookups (1 per IP per minute) ──
const geoLookupLog = new Map<string, number>();
const GEO_COOLDOWN = 60 * 1000;

function shouldGeoLookup(hashedIP: string): boolean {
  const last = geoLookupLog.get(hashedIP) || 0;
  if (Date.now() - last < GEO_COOLDOWN) return false;
  geoLookupLog.set(hashedIP, Date.now());
  // Prune old entries from geo log
  if (geoLookupLog.size > 500) {
    const cutoff = Date.now() - GEO_COOLDOWN * 5;
    for (const [k, v] of geoLookupLog) {
      if (v < cutoff) geoLookupLog.delete(k);
    }
  }
  return true;
}

// ── GET Handler ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const hashedIP = hashIP(ip);
  const isLocal = ip === "127.0.0.1" || ip === "::1";

  checkDayReset();
  pruneStale();

  // Register or refresh this visitor
  const existing = visitors.get(hashedIP);
  if (existing) {
    // Already tracked — just refresh lastSeen
    existing.lastSeen = Date.now();
  } else if (!isLocal && shouldGeoLookup(hashedIP)) {
    // New visitor — geolocate
    const geo = await geolocate(ip);
    if (geo) {
      visitors.set(hashedIP, geo);
      totalVisitsToday++;
      persistedStats.totalAllTime++;
      persistedStats.lastUpdated = new Date().toISOString();
      saveStats(persistedStats);
    }
  }

  // Aggregate locations by city for the globe
  const locationMap = new Map<
    string,
    {
      city: string;
      country: string;
      countryCode: string;
      lat: number;
      lng: number;
      count: number;
    }
  >();

  for (const entry of visitors.values()) {
    const key = `${entry.city}-${entry.countryCode}`;
    const loc = locationMap.get(key);
    if (loc) {
      loc.count++;
    } else {
      locationMap.set(key, {
        city: entry.city,
        country: entry.country,
        countryCode: entry.countryCode,
        lat: entry.lat,
        lng: entry.lng,
        count: 1,
      });
    }
  }

  const locations = Array.from(locationMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return NextResponse.json({
    activeVisitors: visitors.size,
    totalToday: totalVisitsToday,
    totalAllTime: persistedStats.totalAllTime,
    locations,
    timestamp: Date.now(),
  });
}

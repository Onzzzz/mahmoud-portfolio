import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeContactPayload } from "@/lib/sanitize";

const contactLimiter = rateLimit("contact", {
  maxRequests: 3,
  windowMs: 10 * 60 * 1000, // 10 minutes
});

export async function POST(request: Request) {
  // Rate limit check
  const ip = getClientIp(request);
  const limit = contactLimiter.check(ip);

  if (!limit.allowed) {
    return Response.json(
      { success: false, error: "Too many messages. Please try again in a few minutes." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) },
      }
    );
  }

  // Parse and sanitize input
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = sanitizeContactPayload(body);
  if (!result.valid || !result.data) {
    return Response.json(
      { success: false, error: result.error },
      { status: 400 }
    );
  }

  const { name, email, message, type } = result.data;

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const payload = {
    name,
    email,
    message,
    type,
    timestamp: new Date().toISOString(),
    source: "portfolio-website",
  };

  try {
    // Try n8n webhook first
    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (webhookResponse.ok) {
        return Response.json({
          success: true,
          message: "Thank you! Your message has been received. Mahmoud will get back to you soon.",
        });
      }
    }

    // Fallback: send directly to Telegram
    if (telegramToken && telegramChatId) {
      const text = `📬 *New Portfolio Message*\n\n*From:* ${payload.name}\n*Email:* ${payload.email}\n*Type:* ${payload.type}\n\n${payload.message}`;

      const tgResponse = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: "Markdown",
          }),
        }
      );

      if (tgResponse.ok) {
        return Response.json({
          success: true,
          message: "Thank you! Your message has been received. Mahmoud will get back to you soon.",
        });
      }
    }

    return Response.json(
      { success: false, error: "Failed to send message. Please try again or contact directly." },
      { status: 502 }
    );
  } catch {
    return Response.json(
      { success: false, error: "Failed to send message. Please try again or contact directly." },
      { status: 502 }
    );
  }
}

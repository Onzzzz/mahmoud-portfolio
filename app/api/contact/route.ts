import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS = 5;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  const submissions = submissionLog.get(ip) || [];
  const recent = submissions.filter(t => t > windowStart);
  submissionLog.set(ip, recent);
  if (recent.length >= MAX_SUBMISSIONS) return true;
  recent.push(now);
  submissionLog.set(ip, recent);
  return false;
}

async function sendTelegram(name: string, email: string, message: string, type: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  const text = `📬 New Portfolio Contact

👤 Name: ${name}
📧 Email: ${email}
📋 Type: ${type}

📝 Message:
${message}

⏰ ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, type, ...extraFields } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Send Telegram notification directly
    await sendTelegram(name, email, message, type || "General");

    // Also send to n8n webhook if configured
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            message,
            type: type || "general",
            ...extraFields,
            timestamp: new Date().toISOString(),
            source: "portfolio-website",
          }),
        });
      } catch {
        // Webhook is optional, don't fail if it's down
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Mahmoud will get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or reach out via WhatsApp." },
      { status: 500 }
    );
  }
}

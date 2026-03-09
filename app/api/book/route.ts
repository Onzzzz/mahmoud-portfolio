import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_BOOKINGS = 3;
const bookingLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  const submissions = bookingLog.get(ip) || [];
  const recent = submissions.filter((t) => t > windowStart);
  bookingLog.set(ip, recent);
  if (recent.length >= MAX_BOOKINGS) return true;
  recent.push(now);
  bookingLog.set(ip, recent);
  return false;
}

async function sendTelegramBooking(
  name: string,
  email: string,
  date: string,
  time: string,
  notes: string
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  const text = `📅 New Booking Request

👤 Name: ${name}
📧 Email: ${email}
🗓 Date: ${date}
🕐 Time: ${time} (Dubai)

${notes ? `📝 Notes:\n${notes}\n\n` : ""}⏰ Submitted: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })}`;

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
    console.error("Telegram booking notification failed:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many booking requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, date, time, notes } = body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a future date.",
        },
        { status: 400 }
      );
    }

    // Send Telegram notification
    await sendTelegramBooking(name, email, date, time, notes || "");

    return NextResponse.json({
      success: true,
      message:
        "Booking request sent! Mahmoud will confirm your slot via email shortly.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again or reach out via WhatsApp.",
      },
      { status: 500 }
    );
  }
}

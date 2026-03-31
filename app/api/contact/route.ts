interface ContactPayload {
  name: string;
  email: string;
  message: string;
  type: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  // Validate required fields
  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return Response.json(
      { success: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(body.email)) {
    return Response.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    // Forward to n8n webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name.trim(),
        email: body.email.trim(),
        message: body.message.trim(),
        type: body.type || "hello",
        timestamp: new Date().toISOString(),
        source: "portfolio-website",
      }),
    });

    if (!webhookResponse.ok) {
      return Response.json(
        { success: false, error: "Failed to send message. Please try again or contact directly." },
        { status: 502 }
      );
    }
  }

  // Always return success (even without webhook, the form submission is acknowledged)
  return Response.json({
    success: true,
    message: "Thank you! Your message has been received. Mahmoud will get back to you soon.",
  });
}

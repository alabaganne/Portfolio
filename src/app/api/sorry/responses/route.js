import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailNotification(answer) {
  const isYes = answer === "yes";
  const emoji = isYes ? "💍" : "💔";
  const subject = isYes
    ? `💍 Eya said Yes! She forgives you!`
    : `💔 Eya said No...`;
  const heading = isYes
    ? "Eya said Yes! She'll be your wife!"
    : "Eya said No...";
  const subtext = isYes
    ? "She forgave you. Don't ever mess this up again."
    : "She couldn't forgive you... not yet.";

  await resend.emails.send({
    from: "Sorry Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #0f172a, #1e1b4b, #0f172a); border-radius: 24px; border: 1px solid #312e81;">
        <h1 style="color: #a5b4fc; text-align: center; font-size: 24px; font-weight: 400; letter-spacing: 1px;">New Response on /sorry</h1>
        <div style="background: rgba(15, 23, 42, 0.8); border-radius: 16px; padding: 24px; border: 1px solid #1e2a4a; text-align: center; margin-top: 16px;">
          <p style="font-size: 56px; margin: 0;">${emoji}</p>
          <p style="color: #818cf8; font-size: 20px; margin: 16px 0 4px;"><strong>${heading}</strong></p>
          <p style="color: #6b7ca0; font-size: 14px; margin: 0; font-style: italic;">${subtext}</p>
        </div>
        <p style="color: #4a5568; text-align: center; font-size: 12px; margin-top: 20px; font-style: italic;">From the /sorry apology page</p>
      </div>
    `,
  });
}

export async function GET() {
  return Response.json({ message: "Responses are sent via email" }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { answer } = body;

  if (!answer || (answer !== "yes" && answer !== "no")) {
    return Response.json({ error: "Invalid answer" }, { status: 400 });
  }

  try {
    await sendEmailNotification(answer);
  } catch (error) {
    console.error("Failed to send email:", error);
  }

  return Response.json({
    name: "Eya",
    answer,
    timestamp: new Date().toISOString()
  }, { status: 201 });
}

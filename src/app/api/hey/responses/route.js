import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailNotification(name, answer) {
  const isYes = answer === "yes";
  const emoji = isYes ? "💕" : "😬";
  const subject = isYes
    ? `💕 ${name} said Yes!`
    : `😬 ${name} said No...`;
  const heading = isYes
    ? `${name} said Yes! 🎉`
    : `${name} said No... 😅`;
  const subtext = isYes
    ? "Time to celebrate 🥳"
    : "They actually managed to click it...";

  await resend.emails.send({
    from: "Hey Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #fce7f3, #ffffff, #fce7f3); border-radius: 24px;">
        <h1 style="color: #db2777; text-align: center; font-size: 28px;">New Response on /hey</h1>
        <div style="background: white; border-radius: 16px; padding: 24px; border: 2px solid #fbcfe8; text-align: center;">
          <p style="font-size: 56px; margin: 0;">${emoji}</p>
          <p style="color: #ec4899; font-size: 20px; margin: 16px 0 4px;"><strong>${heading}</strong></p>
          <p style="color: #f9a8d4; font-size: 14px; margin: 0;">${subtext}</p>
        </div>
      </div>
    `,
  });
}

export async function GET() {
  // No persistence needed - responses are sent via email
  return Response.json({ message: "Responses are sent via email" }, { status: 200 });
}

function capitalizeName(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(request) {
  const body = await request.json();
  const { name, answer } = body;

  if (!answer || (answer !== "yes" && answer !== "no")) {
    return Response.json({ error: "Invalid answer" }, { status: 400 });
  }

  const displayName = name ? capitalizeName(name.trim()) : "Someone";

  // Send email notification
  try {
    await sendEmailNotification(displayName, answer);
  } catch (error) {
    console.error("Failed to send email:", error);
    // Continue even if email fails
  }

  return Response.json({
    name: displayName,
    answer,
    timestamp: new Date().toISOString()
  }, { status: 201 });
}

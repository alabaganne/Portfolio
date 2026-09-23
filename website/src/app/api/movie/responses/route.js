import { Resend } from "resend";
import { capitalizeName } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailNotification(name, answer) {
  const isYes = answer === "yes";
  const emoji = isYes ? "🎬" : "😅";
  const subject = isYes
    ? `🎬 ${name} said Yes to the movie!`
    : `😅 ${name} said No to the movie...`;
  const heading = isYes
    ? `${name} said Yes! 🍿`
    : `${name} said No... 🎟️`;
  const subtext = isYes
    ? "Time to book those tickets for Sahbek Rajel 2! 🎉"
    : "They actually managed to click it...";

  await resend.emails.send({
    from: "Movie Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: 'Bebas Neue', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #18181b, #000000, #18181b); border-radius: 24px; border: 2px solid #f59e0b;">
        <h1 style="color: #f59e0b; text-align: center; font-size: 28px; letter-spacing: 2px;">New Response on /movie</h1>
        <div style="background: #27272a; border-radius: 16px; padding: 24px; border: 2px solid #f59e0b40; text-align: center;">
          <p style="font-size: 56px; margin: 0;">${emoji}</p>
          <p style="color: #ffffff; font-size: 20px; margin: 16px 0 4px; letter-spacing: 1px;"><strong>${heading}</strong></p>
          <p style="color: #a1a1aa; font-size: 14px; margin: 0;">${subtext}</p>
        </div>
        <p style="color: #71717a; text-align: center; margin-top: 16px; font-size: 12px;">Sahbek Rajel 2 Movie Invitation</p>
      </div>
    `,
  });
}

export async function GET() {
  return Response.json({ message: "Responses are sent via email" }, { status: 200 });
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

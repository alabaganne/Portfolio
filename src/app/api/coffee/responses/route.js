import { Resend } from "resend";
import { capitalizeName } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailNotification(name, answer) {
  const isYes = answer === "yes";
  const emoji = isYes ? "☕" : "😅";
  const subject = isYes
    ? `☕ ${name} said Yes to coffee shop hopping!`
    : `😅 ${name} said No to coffee shop hopping...`;
  const heading = isYes
    ? `${name} said Yes! 🧡`
    : `${name} said No... ☕`;
  const subtext = isYes
    ? "Time to find some cozy cafes! First latte's on you! 🥰"
    : "They actually managed to click it...";

  await resend.emails.send({
    from: "Coffee Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: 'Nunito', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #fff7ed, #ffedd5, #fff7ed); border-radius: 24px; border: 2px solid #fb923c;">
        <h1 style="color: #c2410c; text-align: center; font-size: 24px; font-weight: 800;">New Response on /coffee</h1>
        <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 2px solid #fdba7440; text-align: center; box-shadow: 0 10px 40px rgba(251,146,60,0.1);">
          <p style="font-size: 56px; margin: 0;">${emoji}</p>
          <p style="color: #9a3412; font-size: 20px; margin: 16px 0 4px; font-weight: 700;"><strong>${heading}</strong></p>
          <p style="color: #ea580c; font-size: 14px; margin: 0;">${subtext}</p>
        </div>
        <p style="color: #fb923c; text-align: center; margin-top: 16px; font-size: 12px;">Coffee Shop Adventure Invitation</p>
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

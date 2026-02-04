import { Resend } from "resend";
import { capitalizeName } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVisitNotification(name) {
  const displayName = name || "Someone";
  const subject = `🎂 ${displayName} opened the birthday page!`;

  await resend.emails.send({
    from: "Birthday Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: 'Quicksand', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #fdf2f8, #fae8ff, #e0e7ff); border-radius: 24px; border: 2px solid #ec4899;">
        <h1 style="color: #be185d; text-align: center; font-size: 24px; font-weight: 800;">Birthday Page Visitor!</h1>
        <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 2px solid #f9a8d440; text-align: center; box-shadow: 0 10px 40px rgba(236,72,153,0.1);">
          <p style="font-size: 56px; margin: 0;">🎂</p>
          <p style="color: #9d174d; font-size: 20px; margin: 16px 0 4px; font-weight: 700;"><strong>${displayName} visited!</strong></p>
          <p style="color: #db2777; font-size: 14px; margin: 0;">Someone just opened your birthday page</p>
        </div>
        <p style="color: #ec4899; text-align: center; margin-top: 16px; font-size: 12px;">Birthday Celebration Page</p>
      </div>
    `,
  });
}

export async function GET() {
  return Response.json({ message: "Birthday visit notifications are sent via email" }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  const displayName = name ? capitalizeName(name.trim()) : null;

  try {
    await sendVisitNotification(displayName);
  } catch (error) {
    console.error("Failed to send email:", error);
  }

  return Response.json({
    name: displayName || "Anonymous",
    timestamp: new Date().toISOString()
  }, { status: 201 });
}

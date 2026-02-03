import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailNotification(name, answer) {
  const isYes = answer === "yes";
  const emoji = isYes ? "📚" : "😅";
  const subject = isYes
    ? `📚 ${name} said Yes to the study session!`
    : `😅 ${name} said No to the study session...`;
  const heading = isYes
    ? `${name} said Yes! ☕`
    : `${name} said No... 📖`;
  const subtext = isYes
    ? "Time to find a cozy spot at the library! 🥰"
    : "They actually managed to click it...";

  await resend.emails.send({
    from: "Study Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: 'Libre Baskerville', Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #292524, #1c1917, #292524); border-radius: 24px; border: 2px solid #b45309;">
        <h1 style="color: #fbbf24; text-align: center; font-size: 24px;">New Response on /study</h1>
        <div style="background: #44403c; border-radius: 16px; padding: 24px; border: 2px solid #b4530940; text-align: center;">
          <p style="font-size: 56px; margin: 0;">${emoji}</p>
          <p style="color: #fef3c7; font-size: 20px; margin: 16px 0 4px;"><strong>${heading}</strong></p>
          <p style="color: #a8a29e; font-size: 14px; margin: 0;">${subtext}</p>
        </div>
        <p style="color: #78716c; text-align: center; margin-top: 16px; font-size: 12px;">Study Session Invitation</p>
      </div>
    `,
  });
}

export async function GET() {
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

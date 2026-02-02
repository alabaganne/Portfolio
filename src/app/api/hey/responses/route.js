import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";

const dataFilePath = path.join(process.cwd(), "data", "responses.json");
const resend = new Resend(process.env.RESEND_API_KEY);

async function readResponses() {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeResponses(responses) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(responses, null, 2));
}

async function sendEmailNotification(entry) {
  const emoji = entry.answer === "yes" ? "💕" : "😐";
  const subject = `${emoji} ${entry.name} answered "${entry.answer}" on /hey`;

  await resend.emails.send({
    from: "Hey Page <onboarding@resend.dev>",
    to: "alabaganne9@gmail.com",
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #fce7f3, #ffffff, #fce7f3); border-radius: 24px;">
        <h1 style="color: #db2777; text-align: center; font-size: 24px;">New Response on /hey!</h1>
        <div style="background: white; border-radius: 16px; padding: 24px; border: 2px solid #fbcfe8; text-align: center;">
          <p style="font-size: 48px; margin: 0;">${emoji}</p>
          <p style="color: #ec4899; font-size: 18px;"><strong>${entry.name}</strong> said <strong>"${entry.answer}"</strong></p>
          <p style="color: #f472b6; font-size: 14px;">${new Date(entry.timestamp).toLocaleString()}</p>
        </div>
      </div>
    `,
  });
}

export async function GET() {
  const responses = await readResponses();
  return Response.json(responses);
}

export async function POST(request) {
  const body = await request.json();
  const { name, answer } = body;

  if (!answer || (answer !== "yes" && answer !== "no")) {
    return Response.json({ error: "Invalid answer" }, { status: 400 });
  }

  const entry = {
    name: name || "Anonymous",
    answer,
    timestamp: new Date().toISOString(),
  };

  const responses = await readResponses();
  responses.push(entry);
  await writeResponses(responses);

  // Send email in the background — don't block the response
  sendEmailNotification(entry).catch(() => {});

  return Response.json(entry, { status: 201 });
}

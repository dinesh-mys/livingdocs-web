import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    await ses.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL!,
        Destination: { ToAddresses: [process.env.SES_TO_EMAIL!] },
        Message: {
          Subject: { Data: `LivingDocs Contact: ${name}` },
          Body: {
            Text: {
              Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            },
          },
        },
        ReplyToAddresses: [email],
      })
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SES error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}

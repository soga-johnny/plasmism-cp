import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, url, purpose, contact_type, message } = body;

    const emailContent = `
会社名: ${company}
お名前: ${name}
メールアドレス: ${email}
改善対象のURL: ${url || "未入力"}
予算: ${purpose}
コンペの実施有無: ${contact_type}

【お問い合わせ内容】
${message}
    `;

    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL || ""],
      },
      Message: {
        Subject: {
          Data: `【お問い合わせ】${company}様より`,
        },
        Body: {
          Text: {
            Data: emailContent,
          },
        },
      },
    });

    await sesClient.send(command);

    return NextResponse.json(
      { message: "メール送信が完了しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "メール送信に失敗しました" },
      { status: 500 }
    );
  }
} 
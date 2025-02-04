import { env } from "@/env";
import { formatCurrency } from "@/utils/format-currency";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { NextRequest, NextResponse } from "next/server";

const mailerSend = new MailerSend({
  apiKey: env.API_KEY,
});

const sentFrom = new Sender(env.EMAIL_SENDER, env.NAME_SENDER);

interface SendMailProps {
  value: number;
  name: string;
  emailClient: string;
  message?: string;
  idRent?: string;
  machine: string;
}

export async function POST(req: NextRequest) {
  const { emailClient, name, value, idRent, message, machine } =
    (await req.json()) as SendMailProps;

  const recipients = [new Recipient(emailClient, name)];

  const personalization = [
    {
      email: emailClient,
      data: {
        name,
        rent: {
          idRent,
          message,
        },
        value: formatCurrency(String(value)),
        machine,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Orçamento Aluguel")
    .setTemplateId("z86org8rr214ew13")
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);

  return NextResponse.json(
    { message: "email sending", idRent },
    { status: 200 }
  );
}

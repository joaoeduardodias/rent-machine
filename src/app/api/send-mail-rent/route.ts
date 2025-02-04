import { env } from "@/env";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { NextRequest, NextResponse } from "next/server";

const mailerSend = new MailerSend({
  apiKey: env.API_KEY,
});

const sentFrom = new Sender(env.EMAIL_SENDER, env.NAME_SENDER);

interface SendMailProps {
  emailOwner: string;
  name: string;
  paymentMethod: string;
  installments: number;
  nameClient: string;
  email: string;
  telephone: string;
  message?: string;
  cep: string;
  period: string;
  address: string;
  machine: string;
  number: string;
  idRent?: string;
}

export async function POST(req: NextRequest) {
  const {
    emailOwner,
    name,
    address,
    cep,
    email,
    installments,
    machine,
    message,
    nameClient,
    number,
    paymentMethod,
    period,
    telephone,
    idRent,
  } = (await req.json()) as SendMailProps;

  const recipients = [new Recipient(emailOwner, name)];

  const personalization = [
    {
      email: emailOwner,
      data: {
        name: name,
        rent: {
          cep: cep,
          name: nameClient,
          email: email,
          period: period,
          address: `${address} - ${number}`,
          machine: machine,
          telephone: telephone,
          paymentMethod:
            paymentMethod === "credito"
              ? `${paymentMethod} em ${installments} X`
              : paymentMethod,
          message: message,
          idRent,
        },
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Nova Proposta de Aluguel")
    .setTemplateId("0p7kx4xov7249yjr")
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);

  const returnData = {
    emailOwner,
    name,
    address,
    cep,
    email,
    installments,
    machine,
    message,
    nameClient,
    number,
    paymentMethod,
    period,
    telephone,
    idRent,
  };

  return NextResponse.json(
    { message: "email sending", returnData },
    { status: 200 }
  );
}

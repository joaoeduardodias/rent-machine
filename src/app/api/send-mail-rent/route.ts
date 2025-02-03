import { env } from "@/env";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { NextRequest, NextResponse } from "next/server";

const mailerSend = new MailerSend({
  apiKey: env.API_KEY,
});

const sentFrom = new Sender(
  "joao@trial-neqvygmpwxzg0p7w.mlsender.net",
  "João Dias"
);

interface SendMailProps {
  emailOnwer: string;
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
    emailOnwer,
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

  const recipients = [new Recipient(emailOnwer, name)];

  const personalization = [
    {
      email: emailOnwer,
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
        },
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Nova Proposta de Aluguel")
    .setTemplateId("3vz9dle2056lkj50")
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);

  const returnData = {
    emailOnwer,
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

// import { env } from "@/env";
// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// // const transporter = nodemailer.createTransport({
// //   host: "smtp.zoho.com",
// //   port: 465,
// //   secure: true,
// //   // auth: {
// //   //   user: emailLogin,
// //   //   pass: password,
// //   // },
// // });

// interface MailerProps {
//   senderMail: string;
//   name: string;
//   message: string;
// }

// const mailer = ({
//   senderMail,
//   name,
//   message,
// }: MailerProps): Promise<unknown> => {
//   const from = name && email ? `${name} <${email}> ` : `${name || email}`;

//   const templateEmail = {
//     from,
//     to: `${email}`,
//     subject: `Nova proposta de aluguel - ${name}`,
//     text: `Nome: ${name} \n Email: ${senderMail}`,
//     replyTo: `${name} <${senderMail}> `,
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(templateEmail, (error, info) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(info);
//       }
//     });
//   });
// };

// export async function POST(req: NextRequest) {
//   const { email, name, message } = await req.json();

//   if (!email || !name || !message) {
//     return NextResponse.json(
//       { error: "Missing information!" },
//       { status: 400 }
//     );
//   }

//   try {
//     const mailerRes = await mailer({ senderMail: email, name, message });
//     return NextResponse.json(
//       { success: true, data: mailerRes },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Mailer Error:", error);
//     return NextResponse.json(
//       { error: "Missing information!" },
//       { status: 500 }
//     );
//   }
// }

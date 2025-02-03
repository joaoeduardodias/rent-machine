import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SendOwnerConfirmRentRequest {
  paymentMethod: string;
  installments: number;
  nameClient: string;
  email: string;
  telephone: string;
  message?: string;
  cep: string;
  startDate?: Date;
  endDate?: Date;
  address: string;
  machine: string;
  number: string;
  emailOwner: string;
  name: string;
  idRent: string;
}

export async function sendOwnerConfirmRent({
  address,
  cep,
  email,
  installments,
  machine,
  message,
  nameClient,
  number,
  paymentMethod,
  startDate,
  endDate,
  telephone,
  emailOwner,
  name,
  idRent,
}: SendOwnerConfirmRentRequest) {
  const response = await fetch("/api/send-mail-rent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      cep,
      email,
      installments: paymentMethod === "credito" ? installments : 0,
      machine,
      message,
      nameClient,
      number,
      paymentMethod,
      period: `${format(startDate!, "dd/MM/yyyy", { locale: ptBR })} - ${format(
        endDate!,
        "dd/MM/yyyy",
        { locale: ptBR }
      )}`,
      telephone: telephone.replace(/\D/g, ""),
      emailOwner,
      name,
      idRent,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject({
      status: response.status,
      message: error.message || "Error api",
    });
  }
  const result = await response.json();
  return result;
}

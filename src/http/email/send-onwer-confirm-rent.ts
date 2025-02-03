interface SendOnwerConfirmRentRequest {
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
  emailOnwer: string;
  name: string;
  idRent: string;
}

export async function sendOnwerConfirmRent({
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
  emailOnwer,
  name,
  idRent,
}: SendOnwerConfirmRentRequest) {
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
      period,
      telephone: telephone.replace(/\D/g, ""),
      emailOnwer,
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

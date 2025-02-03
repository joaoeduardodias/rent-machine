interface sendMailClientRequest {
  value: number;
  name: string;
  emailClient: string;
  message?: string;
  idRent: string;
  machine: string;
}

export async function sendMailClient({
  value,
  name,
  emailClient,
  message,
  idRent,
  machine,
}: sendMailClientRequest) {
  const response = await fetch("/api/send-mail-client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      name,
      emailClient,
      value,
      idRent,
      machine,
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

interface CreateRentRequest {
  startDate: Date;
  endDate: Date;
  machineId: string;
  status?: "aproved" | "pending" | "canceled";
  client: string;
  value: number;
  cep: string;
  address: string;
  number: number;
  paymentMethod: string;
  message?: string;
}

export async function createRent({
  address,
  cep,
  client,
  endDate,
  machineId,
  number,
  paymentMethod,
  startDate,
  status,
  value,
  message,
}: CreateRentRequest) {
  const response = await fetch(`/api/create-rent`, {
    method: "POST",
    body: JSON.stringify({
      address,
      cep,
      client,
      endDate,
      machineId,
      number,
      paymentMethod,
      startDate,
      status,
      value,
      message,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject({
      status: response.status,
      message: error.message || "Error api",
    });
  }
  const data = await response.json();
  return data;
}

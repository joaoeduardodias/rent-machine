interface UpdateRentRequest {
  status?: "approved" | "pending" | "canceled";
  value?: number;
  message?: string;
  id: string;
}

export async function updateRent({
  id,
  status,
  value,
  message,
}: UpdateRentRequest) {
  const response = await fetch(`/api/update-rent`, {
    method: "PUT",
    body: JSON.stringify({
      status,
      id,
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

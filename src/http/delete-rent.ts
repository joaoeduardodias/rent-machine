interface DeleteRentRequest {
  id: string;
}

export async function deleteRent({ id }: DeleteRentRequest) {
  const response = await fetch(`/api/delete-rent/${id}`, {
    method: "DELETE",
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

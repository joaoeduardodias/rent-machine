interface DeleteMachineRequest {
  machineId: string;
}

export async function deleteMachine({
  machineId,
}: DeleteMachineRequest): Promise<void> {
  const response = await fetch(`/api/delete-machine?machineId=${machineId}`, {
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

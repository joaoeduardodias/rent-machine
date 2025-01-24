interface EditMachineRequest {
  machineId: string;
  name: string;
  quantity: number;
  image?: FileList | null;
}

export async function editMachine({
  machineId,
  name,
  quantity,
  image,
}: EditMachineRequest): Promise<void> {
  const formData = new FormData();

  if (image) {
    const imageFile = image[0];
    formData.append("image", imageFile);
  }
  formData.append("name", name);
  formData.append("quantity", String(quantity));

  const response = await fetch(`/api/edit-machine?machineId=${machineId}`, {
    method: "PUT",
    body: formData,
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

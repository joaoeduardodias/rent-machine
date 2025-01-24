interface CreateMachineRequest {
  name: string;
  quantity: number;
  image?: FileList;
}

export async function createMachine({
  name,
  quantity,
  image,
}: CreateMachineRequest): Promise<void> {
  if (!image || image.length === 0) {
    return Promise.reject({
      status: 400,
      message: "Missing image",
    });
  }

  const imageFile = image[0];
  const formData = new FormData();
  formData.append("name", name);
  formData.append("quantity", String(quantity));
  formData.append("image", imageFile);

  const response = await fetch("/api/create-machine", {
    method: "POST",
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

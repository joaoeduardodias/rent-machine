import { toast } from "sonner";

interface CreateMachineRequest {
  name: string;
  quantity: number;
  image?: FileList;
  // price_per_day: number;
  // price_per_km: number;
}

export async function createMachine({
  name,
  quantity,
  image,
}: // price_per_day,
// price_per_km,
CreateMachineRequest): Promise<void> {
  if (!image || image.length === 0) {
    toast.error("Por favor, selecione uma imagem.");
    return;
  }

  const imageFile = image[0];
  const formData = new FormData();
  formData.append("name", name);
  formData.append("quantity", String(quantity));
  formData.append("image", imageFile);
  // formData.append("price_per_day", String(data.price_per_day));
  // formData.append("price_per_km", String(data.price_per_km));

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

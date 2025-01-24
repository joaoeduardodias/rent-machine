import { toast } from "sonner";

interface EditMachineRequest {
  machineId: string;
  name: string;
  quantity: number;
  // price_per_day: number;
  // price_per_km: number;
  image?: FileList;
}

export async function editMachine({
  machineId,
  name,
  quantity,
  // price_per_day,
  // price_per_km,
  image,
}: EditMachineRequest): Promise<void> {
  if (!image || image.length === 0) {
    toast.error("Por favor, selecione uma imagem.");
    return;
  }
  const imageFile = image[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("quantity", String(quantity));
  // formData.append("price_per_day", String(price_per_day));
  // formData.append("price_per_km", String(price_per_km));
  formData.append("image", imageFile);

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

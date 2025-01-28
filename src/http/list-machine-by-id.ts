interface DetailsMachineRequest {
  id: string;
}
interface DetailsMachineResponse {
  id: string;
  name: string;
  fileKey: string;
  img_src: string;
  quantity: number;
}
export async function listMachineById({
  id,
}: DetailsMachineRequest): Promise<DetailsMachineResponse> {
  const response = await fetch(`/api/list-machine-by-id/${id}`);

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

import { Machine } from "@/types/machine";

export async function listMachines(): Promise<Machine[]> {
  const response = await fetch("/api/list-machines");
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

interface DetailsMachineRequest {
  id: string;
}
interface DetailsMachineResponse {
  machineName: string;
  unavailablePeriods: {
    endDate: Date;
    startDate: Date;
  }[];
}
export async function detailsMachine({
  id,
}: DetailsMachineRequest): Promise<DetailsMachineResponse> {
  const response = await fetch(`/api/detail-machine/${id}`);

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

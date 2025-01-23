import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function listMachines() {
  try {
    const machines = await prisma.machine.findMany();
    return { success: true, machines };
  } catch (error) {
    return { error: "Failed to fetch machines" + error };
  }
}

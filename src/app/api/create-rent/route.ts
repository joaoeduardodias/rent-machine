import { prisma } from "@/lib/prisma";
import { SelectedMachineType } from "@/types/machine";
import { NextRequest, NextResponse } from "next/server";

type RentMachineBody = {
  startDate: Date;
  endDate: Date;
  machines: SelectedMachineType[];
  email: string;
  status?: "approved" | "pending" | "canceled";
  client: string;
  value: number;
  cep: string;
  address: string;
  number: number;
  paymentMethod: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  try {
    const {
      endDate,
      address,
      cep,
      number,
      paymentMethod,
      status,
      email,
      value,
      message,
      startDate,
      client,
      machines,
    } = (await request.json()) as RentMachineBody;

    if (
      !endDate ||
      !machines ||
      !startDate ||
      !client ||
      !address ||
      !cep ||
      !email ||
      !number ||
      !paymentMethod
    ) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }
    const machineIds = machines.map((machine) => machine.id);
    const existingMachines = await prisma.machine.findMany({
      where: { id: { in: machineIds } },
      select: {
        id: true,
      },
    });

    if (!existingMachines) {
      return NextResponse.json(
        { error: "Machines not exists" },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { error: "initial date invalid" },
        { status: 400 }
      );
    }

    const checks = machineIds.map(async (machineId) => {
      const totalAllocated = await prisma.rent.count({
        where: {
          machines: {
            some: { id: machineId },
          },
          AND: [
            { start_date: { lte: endDate } },
            { end_date: { gte: startDate } },
            { status: { in: ["approved", "pending"] } },
          ],
        },
      });

      const machine = await prisma.machine.findUnique({
        where: { id: machineId },
      });

      if (totalAllocated >= (machine?.quantity ?? 0)) {
        return { machineId, available: false };
      }

      return { machineId, available: true };
    });

    // const conflictingRents = await prisma.rent.findMany({
    //   where: {
    //     machines: {
    //       every: { id: machineId },
    //     },
    //     AND: [
    //       { start_date: { lte: endDate } },
    //       { end_date: { gte: startDate } },
    //       { status: { in: ["approved", "pending"] } },
    //     ],
    //   },
    // });

    // const totalAllocated = conflictingRents.length;

    // if (totalAllocated >= machine.quantity) {
    //   return NextResponse.json(
    //     { error: "Machine unavailable in period" },
    //     { status: 400 }
    //   );
    // }
    const results = await Promise.all(checks);
    const unavailableMachines = results.filter((result) => !result.available);

    if (unavailableMachines.length > 0) {
      return NextResponse.json(
        {
          error: "One or more machines are unavailable in the selected period",
          unavailableMachines,
        },
        { status: 400 }
      );
    }

    const rentCreated = await prisma.rent.create({
      data: {
        address,
        email,
        cep,
        number,
        paymentMethod,
        status: status as "approved" | "pending" | "canceled",
        value,
        message,
        start_date: startDate,
        end_date: endDate,
        machines: { connect: machineIds.map((id) => ({ id })) },
        client,
      },
    });

    return NextResponse.json({
      id: rentCreated.id,
      message: "rent created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error create rent", details: (error as Error).message },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RentMachineBody = {
  startDate: Date;
  endDate: Date;
  machineId: string;
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
      machineId,
    } = (await request.json()) as RentMachineBody;

    if (
      !endDate ||
      !machineId ||
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
    const machine = await prisma.machine.findUnique({
      where: { id: machineId },
    });

    if (!machine) {
      return NextResponse.json(
        { error: "Machine not exists" },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { error: "initial date invalid" },
        { status: 400 }
      );
    }

    const conflictingRents = await prisma.rent.findMany({
      where: {
        machines: {
          every: { id: machineId },
        },
        AND: [
          { start_date: { lte: endDate } },
          { end_date: { gte: startDate } },
          { status: { in: ["approved", "pending"] } },
        ],
      },
    });

    const totalAllocated = conflictingRents.length;

    if (totalAllocated >= machine.quantity) {
      return NextResponse.json(
        { error: "Machine unavailable in period" },
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
        machines: { connect: { id: machineId } },
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

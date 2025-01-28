import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "missing id in route" },
      { status: 400 }
    );
  }

  const rents = await prisma.rent.findMany({
    where: {
      machines: {
        every: { id },
      },
    },
    select: {
      start_date: true,
      end_date: true,
    },
  });
  const machine = await prisma.machine.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({
    machineName: machine?.name,
    unavailablePeriods: rents.map((rent) => ({
      startDate: rent.start_date,
      endDate: rent.end_date,
    })),
  });
}

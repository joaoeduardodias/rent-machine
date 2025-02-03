import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RentMachineBody = {
  id: string;
  status?: "approved" | "pending" | "canceled";
  value?: number;
  message?: string;
};

export async function PUT(request: NextRequest) {
  try {
    const { status, value, message, id } =
      (await request.json()) as RentMachineBody;

    if (!status || !value) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await prisma.rent.update({
      where: {
        id,
      },
      data: {
        status: String(status),
        value,
        message,
      },
    });

    return NextResponse.json({
      message: "rent approved",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error create rent", details: (error as Error).message },
      { status: 500 }
    );
  }
}

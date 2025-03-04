import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const machines = await prisma.machine.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(machines, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error list machines", details: (error as Error).message },
      { status: 500 }
    );
  }
}

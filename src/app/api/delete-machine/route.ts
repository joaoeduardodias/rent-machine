import { r2 } from "@/lib/cloudfare";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const machineId = String(request.nextUrl.searchParams.get("machineId")!);

    const machine = await prisma.machine.findUnique({
      where: {
        id: machineId,
      },
    });
    if (!machine) {
      return NextResponse.json(
        { message: "Machine not exist" },
        { status: 404 }
      );
    }

    await prisma.machine.delete({
      where: {
        id: machineId,
      },
    });

    const command = new DeleteObjectCommand({
      Bucket: "rent-machine",
      Key: machine.fileKey,
    });

    await r2.send(command);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error list machines", details: (error as Error).message },
      { status: 500 }
    );
  }
}

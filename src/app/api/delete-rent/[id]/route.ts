import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

  const rent = await prisma.rent.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "rent deleted", rent });
}

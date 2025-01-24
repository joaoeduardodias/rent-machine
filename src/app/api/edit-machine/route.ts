import { env } from "@/env";
import { r2 } from "@/lib/cloudfare";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.formData();
    const name = body.get("name") as string;
    const quantity = body.get("quantity") as string;
    const image = body.get("image") as File | null;
    const machineId = String(request.nextUrl.searchParams.get("machineId")!);
    if (!name || !quantity) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const machine = await prisma.machine.findUnique({
      where: {
        id: machineId,
      },
      select: {
        fileKey: true,
      },
    });

    if (!machine) {
      return NextResponse.json(
        { message: "Machine not exist" },
        { status: 404 }
      );
    }
    if (image) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: "rent-machine",
        Key: machine.fileKey,
      });
      await r2.send(deleteCommand);

      const contentType = image?.type;
      const fileKey = randomUUID()
        .concat("-")
        .concat(image.name.replace(/\s+/g, "-"));

      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: "rent-machine",
          Key: fileKey,
          ContentType: contentType,
          ACL: "public-read",
        }),
        { expiresIn: 600 }
      );
      const upload = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": image.type,
        },
        body: image,
      });
      if (!upload.ok) {
        return NextResponse.json(
          { error: "Error uploading image" },
          { status: 500 }
        );
      }
      const imgUrl = `${env.CLOUDFARE_DOMAIN_PUBLIC}/${fileKey}`;

      await prisma.machine.update({
        where: {
          id: machineId,
        },
        data: {
          name,
          fileKey,
          img_src: imgUrl,
          quantity: Number(quantity),
        },
      });
    } else {
      await prisma.machine.update({
        where: {
          id: machineId,
        },
        data: {
          name,
          quantity: Number(quantity),
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error update machine", details: (error as Error).message },
      { status: 500 }
    );
  }
}

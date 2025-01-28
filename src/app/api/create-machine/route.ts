import { env } from "@/env";
import { r2 } from "@/lib/cloudfare";
import { prisma } from "@/lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    const name = body.get("name") as string;
    const quantity = body.get("quantity") as string;
    const image = body.get("image") as File | null;

    if (!name || !quantity || !image) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const contentType = image.type;
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

    await prisma.machine.create({
      data: {
        name,
        fileKey,
        quantity: Number(quantity),
        img_src: imgUrl,
      },
    });

    return NextResponse.json({
      message: "Machine created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error create machine", details: (error as Error).message },
      { status: 500 }
    );
  }
}

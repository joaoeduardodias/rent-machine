import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageData = formData.get("image") as File | null;
    if (!imageData) {
      console.error("Nenhum arquivo enviado no FormData.");
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 }
      );
    }

    console.log("Arquivo recebido:", imageData.name);

    const arrayBuffer = await imageData.arrayBuffer();
    const image = Buffer.from(arrayBuffer).toString("base64");

    console.log("Imagem codificada em Base64.");

    const apiKey = process.env.IMAGEBB_API_KEY;

    if (!apiKey) {
      console.error("API Key do ImageBB não configurada.");
      return NextResponse.json(
        { error: "API Key não configurada." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: new URLSearchParams({
          image: image,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro na resposta do ImageBB:", data);
      return NextResponse.json(
        { error: data.error.message },
        { status: response.status }
      );
    }

    console.log("Upload bem-sucedido:", data.data.url);

    return NextResponse.json({
      url: data.data.url,
      deleteUrl: data.data.delete_url,
    });
  } catch (error: unknown) {
    console.error("Erro ao processar o upload:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload da imagem." },
      { status: 500 }
    );
  }
}

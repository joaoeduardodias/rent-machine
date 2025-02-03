"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConfirmationRent() {
  const router = useRouter();

  return (
    <main className="py-5 md:py-10 flex-grow flex items-center justify-center">
      <div className="max-w-4xl text-center bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg">
        <CircleCheck className="size-10 mx-auto my-2" />
        <h2 className="text-2xl  text-gray-800">
          Sua reserva foi confirmada com sucesso
        </h2>
        <p className="my-4">Entraremos em contato com você</p>
        <div className="flex items-center justify-center gap-2">
          <Button
            className="min-w-40"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Voltar
          </Button>
          <Button
            className="min-w-40"
            variant="outline"
            onClick={() => router.push("/rent")}
          >
            Novo Aluguel
          </Button>
        </div>
      </div>
    </main>
  );
}

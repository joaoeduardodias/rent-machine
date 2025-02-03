"use client";
import { listMachines } from "@/http/list-machines";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ListMachines() {
  const {
    data: machines,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-machines"],
    queryFn: listMachines,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {isLoading ? (
        <Loader2 className="size-32 animate-spin" />
      ) : error ? (
        <h2>Erro encontrado</h2>
      ) : (
        machines?.map((machine, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={
                machine.img_src ||
                "https://fakeimg.pl/400x300?text=img+maquinas"
              }
              alt={machine.name}
              width={400}
              height={300}
              className="w-full h-40 md:h-48 object-contain p-2"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-2">{machine.name}</h4>
              <Link
                href="/rent"
                className="text-yellow-500 hover:text-yellow-600"
              >
                Alugar Agora
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

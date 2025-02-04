"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModals } from "@/context/modal-context";
import { listMachines } from "@/http/list-machines";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export function ListMachines() {
  const { openModal } = useModals();

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Imagem</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Quantidade</TableHead>

          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell>
              <p>Carregando...</p>
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell>
              <p>Erro encontrado</p>
            </TableCell>
          </TableRow>
        ) : (
          machines?.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell className="w-40">
                <Image
                  src={
                    machine.img_src ||
                    "https://fakeimg.pl/60x60?text=img+maquinas"
                  }
                  alt={machine.name}
                  width={60}
                  height={60}
                  className="rounded-md h-[50px] w-[50px] object-contain"
                />
              </TableCell>
              <TableCell className="w-2/4">{machine.name}</TableCell>
              <TableCell>{machine.quantity}</TableCell>

              <TableCell className="flex flex-col gap-1 justify-center items-center md:flex-row">
                <Button
                  onClick={() =>
                    openModal("edit-machine", {
                      id: machine.id,
                      name: machine.name,
                      quantity: machine.quantity,
                      img_src: machine.img_src,
                    })
                  }
                  className="w-20 bg-green-400 hover:bg-green-400/80"
                >
                  Editar
                </Button>
                <Button
                  onClick={() =>
                    openModal("confirm-delete", {
                      id: machine.id,
                      name: machine.name,
                    })
                  }
                  className="w-20"
                  variant="destructive"
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

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
          <TableHead>Imagem</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Preço por Dia</TableHead>
          <TableHead>Preço por Km</TableHead>
          <TableHead>Ações</TableHead>
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
              <TableCell>
                <Image
                  src={
                    machine.img_src ||
                    "https://fakeimg.pl/60x60?text=img+maquinas"
                  }
                  alt={machine.name}
                  width={60}
                  height={60}
                  className="rounded-md h-[50px] w-[50px] object-cover"
                />
              </TableCell>
              <TableCell>{machine.name}</TableCell>
              <TableCell>R$ {machine.price_per_day.toFixed(2)}</TableCell>
              <TableCell>R$ {machine.price_per_km.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    openModal("confirm-delete", {
                      id: machine.id,
                      name: machine.name,
                    })
                  }
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

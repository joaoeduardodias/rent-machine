"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormCreateMachine } from "./components/form-create-machine";

type Machine = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ManageMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const storedMachines = localStorage.getItem("machines");
    if (storedMachines) {
      setMachines(JSON.parse(storedMachines));
    }
  }, []);

  const deleteMachine = (id: number) => {
    const updatedMachines = machines.filter((m) => m.id !== id);
    setMachines(updatedMachines);
    localStorage.setItem("machines", JSON.stringify(updatedMachines));
    toast.success("Máquina removida", {
      description: "A máquina foi removida com sucesso.",
    });
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gerenciar Máquinas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Máquina</CardTitle>
        </CardHeader>
        <CardContent>
          <FormCreateMachine />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Máquinas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>image</TableHead>
                <TableHead>name</TableHead>
                <TableHead>Preço por Dia</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell>
                    <Image
                      src={
                        machine.image ||
                        "https://fakeimg.pl/60x60?text=img+maquinas"
                      }
                      alt={machine.name}
                      width={60}
                      height={60}
                      className="rounded-md h-[50px] w-[50px] object-cover"
                    />
                  </TableCell>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>R$ {machine.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteMachine(machine.id)}
                      variant="destructive"
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

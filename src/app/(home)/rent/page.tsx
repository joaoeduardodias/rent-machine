"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRentMachine } from "@/hooks/use-rent-machine";
import { listMachines } from "@/http/list-machines";
import { cn } from "@/lib/utils";
import { Machine, SelectedMachineType } from "@/types/machine";
import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function Rent() {
  const { data: machines } = useQuery({
    queryKey: ["list-machines"],
    queryFn: listMachines,
    staleTime: 60 * 60 * 60,
  });
  const router = useRouter();

  const [selectedMachines, setSelectedMachines] = useState<
    SelectedMachineType[]
  >([]);
  const [open, setOpen] = useState(false);
  const { setCurrentMachines, setEndDate, setStartDate } = useRentMachine();

  function toggleMachineSelected(machine: Machine) {
    setSelectedMachines((prev) => {
      const exists = prev.some((m) => m.id === machine.id);
      return exists
        ? prev.filter((m) => m.id !== machine.id)
        : [...prev, { ...machine, selectedMachineQuantity: 1 }];
    });
  }
  useEffect(() => {
    setCurrentMachines(selectedMachines);
  }, [selectedMachines, setCurrentMachines]);

  function updateQuantityMachineSelect(idMachine: string, newQuantity: number) {
    setSelectedMachines((prev) =>
      prev.map((m) =>
        m.id === idMachine ? { ...m, selectedMachineQuantity: newQuantity } : m
      )
    );
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  useEffect(() => {
    setDate(undefined);
  }, []);

  useEffect(() => {
    if (date?.from && date.to) {
      setEndDate(date.to);
      setStartDate(date.from);
    }
  }, [date, setEndDate, setStartDate]);

  return (
    <main className="flex-grow py-5 md:py-10 bg-white">
      <div className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto bg-yellow-100 p-2 md:p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <Label className="inline-block text-foreground font-bold mb-2 text-base md:text-lg">
              Selecione o Período
            </Label>
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className={cn("w-full h-full flex items-center justify-center")}
              disabled={(date) => date < startOfToday()}
              locale={ptBR}
              classNames={{
                months: "flex w-full flex-col  space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4",
                month: "w-full flex flex-col border border-amber-500 rounded-lg bg-amber-50 p-4",
                table: "w-full  h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",
              }}
            />

            {date?.from && (
              <p className="md:mt-2 text-xs text-center md:text-left  md:text-sm text-muted-foreground">
                Período selecionado:{" "}
                {format(date.from, "dd/MM/yyyy", { locale: ptBR })}
                {date.to
                  ? ` - ${format(date.to, "dd/MM/yyyy", { locale: ptBR })}`
                  : ""}
              </p>
            )}
          </div>

          <div className="mb-8">
            <Label className="block text-foreground font-bold mb-2  text-base md:text-lg">
              Selecione as Máquinas
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="w-full py-5" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between bg-white"
                  disabled={!date}
                >
                  {date
                    ? selectedMachines.length > 0
                      ? `${selectedMachines.length} máquina(s) selecionada(s)`
                      : "Selecione as máquinas"
                    : "Selecione um período primeiro"}

                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Buscar máquina..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma máquina encontrada.</CommandEmpty>
                    {machines?.map((machine) => {
                      const selectedMachine = selectedMachines.find(
                        (m) => m.id === machine.id
                      );
                      return (
                        <CommandItem
                          key={machine.id}
                          onSelect={() => toggleMachineSelected(machine)}
                          className="flex items-center justify-between h-12 px-4 hover:bg-yellow-50 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-yellow-500",
                                selectedMachine ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <span className="font-medium">{machine.name}</span>
                          </div>
                          {selectedMachine ? (
                            <div className="flex items-center space-x-2 bg-yellow-100 rounded-full px-2 py-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-6 rounded-full p-0 hover:bg-yellow-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantityMachineSelect(
                                    machine.id,
                                    Math.max(
                                      0,
                                      selectedMachine.selectedMachineQuantity -
                                      1
                                    )
                                  );
                                }}
                              >
                                <Minus className="h-3 w-3 text-yellow-600" />
                              </Button>
                              <span className="text-sm font-medium text-yellow-700 w-4 text-center">
                                {selectedMachine.selectedMachineQuantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-6 rounded-full p-0 hover:bg-yellow-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantityMachineSelect(
                                    machine.id,
                                    Math.min(
                                      machine.quantity,
                                      selectedMachine.selectedMachineQuantity +
                                      1
                                    )
                                  );
                                }}
                              >
                                <Plus className="h-3 w-3 text-yellow-600" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Quantidade: {machine.quantity}
                            </span>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedMachines.length > 0 && (
              <Table className="mt-2 bg-white shadow-sm p-4 rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableCell>Máquina</TableCell>
                    <TableCell>Quantidade</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedMachines.map((machine) => (
                    <TableRow key={machine.id}>
                      <TableCell>{machine.name}</TableCell>
                      <TableCell>{machine.selectedMachineQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <Button
            onClick={() => router.push("/confirm-rent")}
            className="w-full py-6 disabled:cursor-not-allowed"
            disabled={!selectedMachines || selectedMachines.length <= 0}
          >
            Confirmar Reserva
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </main>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import { useRentMachine } from "@/hooks/use-rent-machine";
import { listMachines } from "@/http/list-machines";
import { cn } from "@/lib/utils";
import { Machine, SelectedMachineType } from "@/types/machine";
import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Check, X } from "lucide-react";
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
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
          Faça sua Reserva
        </h2>
        <div className="max-w-4xl mx-auto bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg">
          {/* <div className="mb-8">
            <Label
              htmlFor="machine"
              className="block text-foreground font-bold mb-2  text-base md:text-lg"
            >
              Selecione a Máquina
            </Label>

            <Select
              disabled={isLoading}
              value={currentMachine}
              onValueChange={(value) => setCurrentMachine(value)}
            >
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Selecione a máquina" />
              </SelectTrigger>
              <SelectContent>
                {machines?.map((machine) => (
                  <SelectItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          <div className="mb-8">
            <Label className="block text-foreground font-bold mb-2  text-base md:text-lg">
              Selecione o Período
            </Label>
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className={cn("w-full flex items-center justify-center")}
              disabled={(date) => date < startOfToday()}
              locale={ptBR}
              classNames={{
                months: "flex flex-col lg:flex-row gap-4",
                month: "border border-amber-500 rounded-lg bg-amber-50 p-6",
                head_cell:
                  "font-light text-sm px-[5px] md:px-[13px] text-muted-foreground mt-1",
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
                    <CommandGroup>
                      {machines?.map((machine) => (
                        <CommandItem
                          key={machine.id}
                          onSelect={() => toggleMachineSelected(machine)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedMachines.some((m) => m.id === machine.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span>{machine.name}</span>
                          <span className="ml-auto text-sm text-gray-500">
                            Quantidade: {machine.quantity}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedMachines.map((machine) => (
                <Badge key={machine.id} variant="secondary" className="p-2">
                  <span>{machine.name}</span>
                  <div className="ml-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 text-gray-500"
                      onClick={() =>
                        updateQuantityMachineSelect(
                          machine.id,
                          Math.max(1, machine.quantity - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="mx-1">
                      {machine.selectedMachineQuantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 text-gray-500"
                      onClick={() =>
                        updateQuantityMachineSelect(
                          machine.id,
                          Math.min(
                            machine.quantity,
                            machine.selectedMachineQuantity + 1
                          )
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0"
                    onClick={() => toggleMachineSelected(machine)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
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

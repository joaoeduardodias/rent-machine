"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRentMachine } from "@/hooks/use-rent-machine";
import { detailsMachine } from "@/http/details-machine";
import { listMachines } from "@/http/list-machines";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function Rent() {
  const { data: machines, isLoading } = useQuery({
    queryKey: ["list-machines"],
    queryFn: listMachines,
    staleTime: 60 * 60 * 60,
  });
  const {
    currentMachine,
    setCurrentMachine,
    setCurrentMachineName,
    setPeriodRent,
  } = useRentMachine();

  const { data } = useQuery({
    queryKey: [`details-machine-${currentMachine}`],
    queryFn: () => detailsMachine({ id: currentMachine }),
    staleTime: 60 * 60 * 60,
    enabled: !!currentMachine,
  });

  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  useEffect(() => {
    setDate(undefined);
  }, []);
  useEffect(() => {
    if (!currentMachine) {
      setDate(undefined);
    }
  }, [currentMachine]);

  useEffect(() => {
    if (date?.from && date.to) {
      setPeriodRent(
        `${format(date.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(
          date.to,
          "dd/MM/yyyy",
          { locale: ptBR }
        )}`
      );
    }
    if (data?.machineName) {
      setCurrentMachineName(data.machineName);
    }
  }, [date, setPeriodRent, setCurrentMachineName, data?.machineName]);

  return (
    <main className="min-h-screen bg-yellow-50">
      <section className="py-5 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
            Faça sua Reserva
          </h2>
          <div className="max-w-4xl mx-auto bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg">
            <div className="mb-8">
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
            </div>
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
                disabled={(date) => {
                  if (!currentMachine || date < startOfToday()) {
                    return true;
                  }
                  return (
                    data?.unavailablePeriods?.some((unavailablePeriod) => {
                      const startDate = new Date(unavailablePeriod.startDate);
                      const endDate = new Date(unavailablePeriod.endDate);

                      return date >= startDate && date <= endDate;
                    }) || false
                  );
                }}
                locale={ptBR}
                classNames={{
                  months: "flex flex-col  md:flex-row gap-4",
                  month: "border border-amber-500 rounded-lg bg-amber-50 p-8",
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

            <Button
              onClick={() => router.push("/confirm-rent")}
              className="w-full py-6 disabled:cursor-not-allowed"
              disabled={!currentMachine}
            >
              Confirmar Reserva
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

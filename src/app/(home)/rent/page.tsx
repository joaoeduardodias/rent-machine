"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useRentMachine } from "@/hooks/use-rent-machine";
import { cn } from "@/lib/utils";
import { addDays, format, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const machines = [
  { id: 1, nome: "Escavadeira", preco: 500 },
  { id: 2, nome: "Retroescavadeira", preco: 450 },
  { id: 3, nome: "Pá Carregadeira", preco: 400 },
  { id: 4, nome: "Rolo Compactador", preco: 350 },
];

export default function Rent() {
  const { currentMachine, setCurrentMachine } = useRentMachine();
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // const calcularTotal = () => {
  //   if (!currentMachine || !date?.from || !date?.to) return 0;
  //   const machine = machines.find((m) => m.id === parseInt(currentMachine));
  //   const dias =
  //     Math.ceil(
  //       (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
  //     ) + 1;
  //   return machine ? machine.preco * dias : 0;
  // };

  useEffect(() => {
    setDate(undefined);
  }, []);
  useEffect(() => {
    if (!currentMachine) {
      setDate(undefined);
    }
  }, [currentMachine]);

  return (
    <main className="min-h-screen bg-yellow-50">
      <section className="py-10 md:py-20 bg-white">
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
              <div className="relative">
                <select
                  name="machine"
                  value={currentMachine}
                  onChange={(e) => setCurrentMachine(e.target.value)}
                  className="block appearance-none w-full bg-white border border-yellow-300 text-foreground py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-yellow-500 transition duration-300"
                >
                  <option value="">Escolha uma máquina</option>
                  {machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.nome}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
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
                  return !currentMachine || date < startOfToday();
                }}
                locale={ptBR}
                classNames={{
                  months: "flex flex-col  md:flex-row  gap-4",
                  month: "border border-amber-500 rounded-lg bg-amber-50 p-6",
                  head_cell:
                    "font-light text-sm px-[5px] md:px-[13px]  text-muted-foreground mt-1",
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
            {/* <div className="mb-8">
                <p className="text-2xl font-bold text-gray-800">
                  Total: R$ {calcularTotal()}
                </p>
              </div> */}
            <Button
              onClick={() => router.push("/confirm-rent")}
              className="w-full text-white py-6 disabled:cursor-not-allowed"
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

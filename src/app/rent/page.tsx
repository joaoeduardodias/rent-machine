"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays, format, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const maquinas = [
  { id: 1, nome: "Escavadeira", preco: 500 },
  { id: 2, nome: "Retroescavadeira", preco: 450 },
  { id: 3, nome: "Pá Carregadeira", preco: 400 },
  { id: 4, nome: "Rolo Compactador", preco: 350 },
];

export default function Alugar() {
  const [maquinaSelecionada, setMaquinaSelecionada] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const calcularTotal = () => {
    if (!maquinaSelecionada || !date?.from || !date?.to) return 0;
    const maquina = maquinas.find((m) => m.id === parseInt(maquinaSelecionada));
    const dias =
      Math.ceil(
        (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    return maquina ? maquina.preco * dias : 0;
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-yellow-500 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ConstrutAluga</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/#sobre"
                  className="text-white hover:text-yellow-200"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/#maquinas"
                  className="text-white hover:text-yellow-200"
                >
                  Máquinas
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-white hover:text-yellow-200"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="text-white hover:text-yellow-200"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              Faça sua Reserva
            </h2>
            <div className="max-w-4xl mx-auto bg-yellow-100 p-8 rounded-lg shadow-lg">
              <div className="mb-8">
                <label
                  htmlFor="maquina"
                  className="block text-gray-700 font-bold mb-2 text-lg"
                >
                  Selecione a Máquina
                </label>
                <div className="relative">
                  <select
                    id="maquina"
                    value={maquinaSelecionada}
                    onChange={(e) => setMaquinaSelecionada(e.target.value)}
                    className="block appearance-none w-full bg-white border border-yellow-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-yellow-500 transition duration-300"
                  >
                    <option value="">Escolha uma máquina</option>
                    {maquinas.map((maquina) => (
                      <option key={maquina.id} value={maquina.id}>
                        {maquina.nome} - R$ {maquina.preco}/dia
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-lg">
                  Selecione o Período
                </label>

                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className={cn("w-full flex items-center justify-center")}
                  disabled={(date) => date < startOfToday()}
                  locale={ptBR}
                  classNames={{
                    months: "flex gap-4",
                    month: "border border-amber-500 rounded-lg bg-amber-50 p-6",
                    day: "size-12  rounded-lg hover:bg-amber-500 transition-colors duration-200",
                    head_cell:
                      "font-ligh text-sm px-3 text-muted-foreground mt-1",
                    day_selected: "bg-amber-500 rounded-e-none text-white", // Dia selecionado
                    day_range_start: "bg-amber-500 text-white", // Início do intervalo
                    day_range_middle:
                      "bg-amber-300/80 rounded-none text-amber-600", // Meio do intervalo
                    day_range_end:
                      "bg-amber-500 rounded-s-none rounded-e-lg text-white", // Fim do intervalo
                  }}
                />

                {date?.from && (
                  <p className="mt-2 text-sm text-gray-600">
                    Período selecionado:{" "}
                    {format(date.from, "dd/MM/yyyy", { locale: ptBR })}
                    {date.to
                      ? ` - ${format(date.to, "dd/MM/yyyy", { locale: ptBR })}`
                      : ""}
                  </p>
                )}
              </div>
              <div className="mb-8">
                <p className="text-2xl font-bold text-gray-800">
                  Total: R$ {calcularTotal()}
                </p>
              </div>
              <button
                onClick={() => alert("Reserva confirmada!")}
                className="w-full bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center hover:bg-yellow-600 transition duration-300"
              >
                Confirmar Reserva
                <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-4">ConstrutAluga</h5>
            <p className="text-gray-400">
              Soluções de aluguel para sua construção.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Contato</h5>
            <p className="text-gray-400">Email: contato@construtaluga.com</p>
            <p className="text-gray-400">Telefone: (11) 1234-5678</p>
          </div>
          <div className="w-full md:w-1/3">
            <h5 className="text-xl font-bold mb-4">Redes Sociais</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listMachines } from "@/http/list-machines";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
];

export default function DashboardHome() {
  const { data: machines, isLoading } = useQuery({
    queryKey: ["list-machines"],
    queryFn: listMachines,
    staleTime: 60 * 60 * 60, //  1 hour
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateRentalData = (period: string) => {
    const data = machines?.map((machine) => ({
      name: machine,
      alugueis: Math.floor(Math.random() * 100) + 1,
    }));
    return data;
  };
  const generateRentedMachinesData = () => {
    const machines = [
      "Escavadeira",
      "Retroescavadeira",
      "Pá Carregadeira",
      "Rolo Compactador",
      "Trator",
      "Caminhão",
    ];
    const clients = [
      "Construtora Silva",
      "Engenharia Oliveira",
      "Obras Rápidas Ltda",
      "Terraplanagem Express",
      "Construções Modernas S.A.",
    ];
    return Array.from({ length: 10 }, (_, i) => {
      const rentalDays = Math.floor(Math.random() * 30) + 1;
      const currentDate = new Date();
      const deliveryDate = new Date(
        currentDate.getTime() + rentalDays * 24 * 60 * 60 * 1000
      );
      return {
        id: i + 1,
        machine: machines[Math.floor(Math.random() * machines.length)],
        rentalPeriod: `${rentalDays} dias`,
        client: clients[Math.floor(Math.random() * clients.length)],
        deliveryDate: deliveryDate.toLocaleDateString("pt-BR"),
        daysUntilDelivery: Math.ceil(
          (deliveryDate.getTime() - currentDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      };
    });
  };

  const [timePeriod, setTimePeriod] = useState("semana");
  const rentalData = generateRentalData("semana");
  const rentedMachines = generateRentedMachinesData();

  const totalRentals = rentalData?.reduce(
    (acc, curr) => acc + curr.alugueis,
    0
  );
  if (!totalRentals || !rentalData) return;

  const averageRentals = (totalRentals / rentalData.length).toFixed(2);
  const mostRentedMachine = rentalData?.reduce((prev, current) =>
    prev.alugueis > current.alugueis ? prev : current
  );

  return (
    <main className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semana">Última Semana</SelectItem>
            <SelectItem value="mes">Último Mês</SelectItem>
            <SelectItem value="ano">Último Ano</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Aluguéis
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRentals}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Aluguéis
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRentals} %</div>
            <p className="text-xs text-muted-foreground">
              -3.2% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Máquina Mais Alugada
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mostRentedMachine?.name.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {mostRentedMachine?.alugueis} aluguéis
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise de Aluguéis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar">
            <TabsList className="mb-4">
              <TabsTrigger value="bar">Gráfico de Barras</TabsTrigger>
              <TabsTrigger value="pie">Gráfico de Pizza</TabsTrigger>
            </TabsList>
            <TabsContent value="bar">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                </div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="80%" height="100%">
                    <BarChart
                      data={rentalData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis orientation="left" stroke="#F59E0B" />

                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="alugueis"
                        fill="#F59E0B"
                        name="Aluguéis"
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </TabsContent>
            <TabsContent value="pie">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                </div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={rentalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="alugueis"
                        label={({ name, percent }) =>
                          `${name.name} - ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {rentalData?.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Máquinas Alugadas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Máquina</TableHead>
                  <TableHead>Tempo de Aluguel</TableHead>
                  <TableHead>Prazo p/ Entrega</TableHead>
                  <TableHead>Cliente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentedMachines.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-6 font-medium">
                      {item.machine}
                    </TableCell>
                    <TableCell>{item.rentalPeriod}</TableCell>
                    <TableCell>
                      <span
                        className={
                          item.daysUntilDelivery <= 3
                            ? "text-red-500 font-bold"
                            : ""
                        }
                      >
                        {item.daysUntilDelivery <= 1
                          ? item.daysUntilDelivery + " dia"
                          : item.daysUntilDelivery + " dias"}
                      </span>
                    </TableCell>
                    <TableCell>{item.client}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

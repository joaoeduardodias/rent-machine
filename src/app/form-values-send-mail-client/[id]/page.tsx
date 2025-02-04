import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  DollarSign,
  Mail,
  MapPin,
  Text,
  Truck,
  User,
} from "lucide-react";
import { FormSendMail } from "../components/form-send-mail";

interface PageValuesSendMailClientProps {
  params: Promise<{ id: string }>;
}

export default async function PageValuesSendMailClient({
  params,
}: PageValuesSendMailClientProps) {
  const { id } = await params;

  const rent = await prisma.rent.findUnique({
    where: {
      id,
    },
    select: {
      cep: true,
      address: true,
      client: true,
      end_date: true,
      id: true,
      email: true,
      machines: {
        select: {
          name: true,
        },
      },
      message: true,
      number: true,
      paymentMethod: true,
      start_date: true,
    },
  });

  if (!rent) <p>Nenhum aluguel encontrado</p>;
  const machine = rent?.machines.map((item) => item.name);

  return (
    <main className="flex-grow py-5 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
          Envie o orçamento para o cliente
        </h2>
        <div className="max-w-4xl mx-auto bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormSendMail
              name={rent?.client ? rent.client : ""}
              emailClient={rent?.email ? rent.email : ""}
              machine={String(machine)}
              idRent={id}
            />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="md:text-2xl text-center md:text-left font-bold text-gray-800 mb-6">
                Dados do aluguel
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Truck className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    Máquina:
                    <span className="text-muted-foreground text-sm ml-1">
                      {String(machine)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    Período do aluguel:
                    <span className="text-muted-foreground text-sm ml-1">
                      {rent?.start_date
                        ? format(rent?.start_date, "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : ""}{" "}
                      -{" "}
                      {rent?.end_date
                        ? format(rent?.end_date, "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : ""}
                    </span>
                  </p>
                </div>
                <div className="flex  items-center">
                  <MapPin className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <div className="flex flex-col ">
                    <p className="text-sm md:text-base">
                      Endereço:
                      <span className="text-muted-foreground text-sm ml-1">
                        {rent?.address} - Nº {rent?.number}
                      </span>
                    </p>
                    <p className="text-sm md:text-base">
                      Cep:
                      <span className="text-muted-foreground text-sm ml-1">
                        {rent?.cep}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    Cliente:
                    <span className="text-muted-foreground text-sm ml-1">
                      {rent?.client}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    E-mail:
                    <span className="text-muted-foreground text-sm ml-1">
                      {rent?.email}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <DollarSign className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    Pagamento:
                    <span className="text-muted-foreground text-sm ml-1">
                      {rent?.paymentMethod}
                    </span>
                  </p>
                </div>
                {rent?.message && (
                  <div className="flex items-center">
                    <Text className="text-yellow-500 mr-2 size-5 md:size-6" />
                    <p className="text-sm md:text-base">
                      Mensagem do cliente:
                      <span className="text-muted-foreground text-sm ml-1">
                        {rent?.message}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

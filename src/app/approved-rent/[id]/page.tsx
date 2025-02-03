import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/utils/format-currency";
import { FormApprovedRent } from "../components/form-approved-rent";

interface PageApprovedRentProps {
  params: Promise<{ id: string }>;
}

export default async function PageApprovedRent({
  params,
}: PageApprovedRentProps) {
  const { id } = await params;

  const rent = await prisma.rent.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
      value: true,
    },
  });

  if (!rent) <p>Nenhum aluguel encontrado</p>;

  return (
    <main className="flex-grow py-5 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800  mb-6 text-center">
          Aprovar Orçamento
        </h2>
        <div className="max-w-4xl mx-auto bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg space-y-2">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="flex items-center gap-2 p-4">
              Valor Total: <span>{formatCurrency(String(rent?.value))}</span>
            </div>
          </div>
          <FormApprovedRent idRent={id} />
        </div>
      </div>
    </main>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { updateRent } from "@/http/update-rent";
import { formatCurrency } from "@/utils/format-currency";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface FormApprovedRentProps {
  idRent: string;
  value: string;
}

export function FormApprovedRent({ idRent, value }: FormApprovedRentProps) {
  const router = useRouter();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)


  const approvedRentMutation = useMutation({
    mutationFn: updateRent,
    mutationKey: ["status-update-approved"],
    onError: () => {
      toast.error("Erro encontrado, por favor tente novamente.");
    },
    onSuccess: () => {
      toast.success("Aluguel Aprovado com sucesso.");
      router.push("/");
    },
  });
  const canceledRentMutation = useMutation({
    mutationFn: updateRent,
    mutationKey: ["status-update-canceled"],
    onError: () => {
      toast.error("Erro encontrado, por favor tente novamente.");
    },
    onSuccess: () => {
      toast.success("Aluguel Cancelado com sucesso.");
      router.push("/");
    },
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-8 p-6 bg-gray-50 rounded-lg max-h-96 overflow-y-auto space-y-4">
        <h3 className="text-xl font-semibold mb-4">Contrato de Aluguel</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc
          nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nisl nec ultricies ultricies, nunc
          nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.
        </p>
        <p className="text-gray-700">
          Praesent euismod, nisl nec ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae
          nisl. Sed euismod, nisl nec ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae
          nisl.
        </p>
        <p className="text-gray-700">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod, nisl
          nec ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.
        </p>
        <p className="text-gray-700">
          Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
          condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
        </p>
        <p className="text-gray-800">
          Valor total do aluguel: <span className="font-semibold">{formatCurrency(value)}</span>
        </p>

      </div>
      <div className="flex items-center space-x-2 mb-8">
        <Checkbox
          id="termos"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
        />
        <label
          htmlFor="termos"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Eu li e aceito os termos do contrato
        </label>
      </div>

      <div className="flex justify-between">
        <Button type="reset" onClick={() => canceledRentMutation.mutateAsync({ id: idRent, status: 'canceled' })} variant="outline" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Cancelar
        </Button>
        <Button
          onClick={() => approvedRentMutation.mutateAsync({ id: idRent, status: 'approved' })}
          disabled={approvedRentMutation.isPending || !acceptTerms}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600"
        >
          Aprovar Orçamento <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>

  );
}

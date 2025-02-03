"use client";
import { Button } from "@/components/ui/button";
import { updateRent } from "@/http/update-rent";
import { useMutation } from "@tanstack/react-query";
import { Ban, CircleCheck } from "lucide-react";

export interface FormApprovedRentProps {
  idRent: string;
}

export function FormApprovedRent({ idRent }: FormApprovedRentProps) {
  const approvedRentMutation = useMutation({
    mutationFn: updateRent,
    mutationKey: ["status-update-approved"],
  });

  return (
    <div className="flex flex-col justify-center items-center space-y-2 md:space-y-6">
      <p className="text-xl">Deseja realmente aprovar o orçamento ?</p>
      <div className="flex gap-2">
        <Button
          type="reset"
          onClick={() =>
            approvedRentMutation.mutateAsync({ id: idRent, status: "canceled" })
          }
          disabled={approvedRentMutation.isPending}
          className="py-5"
        >
          <Ban className="mr-1" />
          Cancelar
        </Button>
        <Button
          onClick={() =>
            approvedRentMutation.mutateAsync({ id: idRent, status: "approved" })
          }
          disabled={approvedRentMutation.isPending}
          type="submit"
          className="py-5"
        >
          Aprovar
          <CircleCheck className="ml-1" />
        </Button>
      </div>
    </div>
  );
}

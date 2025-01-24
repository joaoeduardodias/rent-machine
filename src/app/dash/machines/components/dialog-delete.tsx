"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModals } from "@/context/modal-context";
import { deleteMachine } from "@/http/remove-machine";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function DialogDeleteMachine() {
  const { modals, machineData, toggleModal } = useModals();
  const queryClient = useQueryClient();
  const deleteMachineMutation = useMutation({
    mutationFn: deleteMachine,
    mutationKey: ["delete-machine"],
    onError: () => {
      toast.error("Erro encontrado, por favor tente novamente.");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["list-machines"] });
      toast.success("Máquina removida com sucesso.");
    },
  });

  return (
    <AlertDialog
      open={modals["confirm-delete"]}
      onOpenChange={() => toggleModal("confirm-delete")}
    >
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {`Remover ${machineData?.name}`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`Deseja realmente remover ${machineData?.name}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-w-28">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="min-w-28"
            onClick={() => {
              deleteMachineMutation.mutateAsync({
                machineId: String(machineData?.id),
              });
            }}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

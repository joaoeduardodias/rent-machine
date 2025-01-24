import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DialogDeleteMachine } from "./components/dialog-delete";
import { DialogEditMachine } from "./components/edit-machine";
import { FormCreateMachine } from "./components/form-create-machine";
import { ListMachines } from "./components/list-machines";

export default async function ManageMachines() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gerenciar Máquinas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Máquina</CardTitle>
        </CardHeader>
        <CardContent>
          <FormCreateMachine />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Máquinas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <ListMachines />
        </CardContent>
        <DialogDeleteMachine />
        <DialogEditMachine />
      </Card>
    </div>
  );
}

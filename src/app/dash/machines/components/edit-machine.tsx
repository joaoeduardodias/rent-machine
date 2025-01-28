"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModals } from "@/context/modal-context";
import { editMachine } from "@/http/edit-machine";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  quantity: number;
  image?: FileList;
};

export function DialogEditMachine() {
  const { modals, machineData, toggleModal, closeModal } = useModals();
  const [previewUploadImage, setPreviewUploadImage] = useState<string | null>(
    null
  );

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (machineData) {
      reset({
        name: machineData?.name,
        quantity: machineData.quantity,
      });

      setPreviewUploadImage(machineData.img_src!);
    }
  }, [machineData, reset]);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      if (!machineData) {
        setPreviewUploadImage(null);
      } else {
        setPreviewUploadImage(machineData.img_src!);
      }
    }
  }, [watchImage, machineData]);

  const queryClient = useQueryClient();
  const editMachineMutation = useMutation({
    mutationFn: editMachine,
    mutationKey: ["edit-machine"],
    onError: () => {
      toast.error("Erro encontrado, por favor tente novamente.");
    },
    onSuccess: async () => {
      closeModal("edit-machine");
      queryClient.invalidateQueries({ queryKey: ["list-machines"] });
      toast.success("Máquina editada com sucesso.");
    },
  });

  async function handleEditMachine(data: FormData) {
    if (data.image) {
      await editMachineMutation.mutateAsync({
        machineId: String(machineData?.id),
        name: data.name,
        quantity: data.quantity,
        image: data.image,
      });
    } else {
      await editMachineMutation.mutateAsync({
        machineId: String(machineData?.id),
        name: data.name,
        quantity: data.quantity,
      });
    }
  }

  return (
    <Dialog
      open={modals["edit-machine"]}
      onOpenChange={() => toggleModal("edit-machine")}
    >
      <DialogContent className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(handleEditMachine)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center">Atualizar Máquina</DialogTitle>
            <DialogDescription className="sr-only">
              Atualizar máquina
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 w-full flex-wrap">
            <div className="w-full lg:flex-1">
              <Label htmlFor="name" className="font-medium text-gray-700">
                Nome da Máquina
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
                className="mt-1 hover:border-ring"
              />
              {errors.name?.message && (
                <p className="text-red-500 text-sm font-light">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="w-full lg:flex-1">
              <Label htmlFor="quantity" className="font-medium text-gray-700">
                Quantidade
              </Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-ring"
              />
              {errors.quantity?.message && (
                <p className="text-red-500 text-sm font-light">
                  {errors.quantity?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 relative rounded-md">
            <Controller
              name="image"
              control={control}
              rules={{
                required: { value: true, message: "Selecione uma imagem" },
              }}
              defaultValue={null as unknown as FileList}
              render={({ field }) => (
                <>
                  <Label
                    htmlFor="image-edit"
                    tabIndex={0}
                    className={`relative flex z-30 flex-col w-full h-20 border 
                      border-dashed rounded-md cursor-pointer border-gray-300 
                      hover:border-ring 
                      hover:bg-primary/10 transition-colors 
                      focus:outline-none 
                      focus:ring-1 
                      focus:ring-primary
                      focus:bg-primary/10
                      ${previewUploadImage && "bg-primary/10"}`}
                  />
                  <Input
                    id="image-edit"
                    type="file"
                    accept="image/*"
                    className="mt-1 sr-only"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                  {previewUploadImage ? (
                    <Image
                      src={
                        previewUploadImage ||
                        "https://fakeimg.pl/200x100?text=img+maquinas"
                      }
                      alt="Preview"
                      width={100}
                      height={50}
                      className="rounded-md object-cover h-[50px] w-[100px] absolute"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      Clique ou arraste para enviar uma imagem
                    </span>
                  )}
                </>
              )}
            />
          </div>
          {errors.image?.message && (
            <p className="text-red-500 text-sm font-light !mt-0">
              {errors.image.message}
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="min-w-28"
              type="submit"
              disabled={editMachineMutation.isPending}
            >
              {editMachineMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

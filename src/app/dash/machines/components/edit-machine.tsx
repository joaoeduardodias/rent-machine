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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface FormData {
  img_src: FileList | null;
}
const editMachineSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ser maior que 03 caracteres" }),
  quantity: z
    .number()
    .min(0, { message: "A quantidade deve ser maior que 0." }),

  // price_per_day: z.string({ message: "O preço por dia é obrigatório" }),
  // price_per_km: z.string({ message: "O preço por km é obrigatório" }),
});

type EditMachineType = z.infer<typeof editMachineSchema>;

export function DialogEditMachine() {
  const { modals, machineData, toggleModal } = useModals();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EditMachineType & FormData>({
    resolver: zodResolver(editMachineSchema),
  });
  useEffect(() => {
    if (machineData) {
      reset({
        name: machineData?.name,
        quantity: machineData.quantity,
        // price_per_day: String(machineData?.price_per_day),
        // price_per_km: String(machineData?.price_per_km),
      });

      setPreviewImage(machineData.img_src!);
    }
  }, [machineData, reset]);

  const watchImage = watch("img_src");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [watchImage]);

  const queryClient = useQueryClient();
  const editMachineMutation = useMutation({
    mutationFn: editMachine,
    mutationKey: ["edit-machine"],
    onError: () => {
      toast.error("Erro encontrado, por favor tente novamente.");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["list-machines"] });
      toast.success("Máquina editada com sucesso.");
    },
  });

  async function handleEditMachine(data: EditMachineType) {
    await editMachineMutation.mutateAsync({
      machineId: String(machineData?.id),
      name: data.name,
      quantity: data.quantity,
      // price_per_day: Number(data.price_per_day),
      // price_per_km: Number(data.price_per_km),
    });
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
            {/* <div className="w-full lg:flex-1">
              <Label
                htmlFor="price_per_day"
                className="font-medium text-gray-700"
              >
                Preço por Dia (R$)
              </Label>
              <Input
                id="price_per_day"
                type="number"
                {...register("price_per_day", {
                  required: "O preço é obrigatório",
                  min: {
                    message: "O preço deve ser maior que 0.",
                    value: 0,
                  },
                })}
                className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-ring"
              />
              {errors.price_per_day?.message && (
                <p className="text-red-500 text-sm font-light">
                  {errors.price_per_day?.message}
                </p>
              )}
            </div>
            <div className="w-full lg:flex-1">
              <Label
                htmlFor="price_per_km"
                className="font-medium text-gray-700"
              >
                Preço por Km (R$)
              </Label>
              <Input
                id="price_per_km"
                type="number"
                {...register("price_per_km", {
                  required: "O preço é obrigatório",
                  min: {
                    message: "O preço deve ser maior que 0.",
                    value: 0,
                  },
                })}
                className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-ring"
              />
              {errors.price_per_km?.message && (
                <p className="text-red-500 text-sm font-light">
                  {errors.price_per_km?.message}
                </p>
              )}
            </div>
          </div> */}
            <div className="w-full lg:flex-1">
              <Label htmlFor="quantity" className="font-medium text-gray-700">
                Preço por Km (R$)
              </Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity")}
                className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-ring"
              />
              {errors.quantity?.message && (
                <p className="text-red-500 text-sm font-light">
                  {errors.quantity?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 relative border rounded-md border-gray-300">
            <Controller
              name="img_src"
              control={control}
              defaultValue={null as unknown as FileList}
              render={({ field }) => (
                <>
                  <Label
                    htmlFor="image"
                    className={`flex flex-col w-full h-20 border-2 border-dashed rounded-md cursor-pointer border-gray-300 hover:border-ring hover:bg-primary/10 transition-colors ${
                      previewImage && "bg-primary/10"
                    }`}
                  />

                  {previewImage ? (
                    <Image
                      src={
                        previewImage ||
                        "https://fakeimg.pl/200x100?text=img+maquinas"
                      }
                      alt="Preview"
                      width={100}
                      height={50}
                      className="rounded-md object-cover h-[50px] w-[100px] absolute"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 absolute top-[50%]">
                      Clique ou arraste para enviar uma imagem
                    </span>
                  )}

                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="mt-1 hidden"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                </>
              )}
            />
            {errors.img_src?.message && (
              <p className="text-red-500 text-sm font-light">
                {errors.img_src?.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button className="min-w-28" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

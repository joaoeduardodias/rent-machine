"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createMachine } from "@/http/create-machine";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  quantity: number;
  image: FileList;
};

export function FormCreateMachine() {
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const watchimage = watch("image");

  // preview image
  useEffect(() => {
    if (watchimage && watchimage.length > 0) {
      const file = watchimage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [watchimage]);

  const createMachineMutation = useMutation({
    mutationFn: createMachine,
    mutationKey: ["create-machine"],
    onSuccess: async () => {
      toast.success("Máquina criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["list-machines"] });
      reset();
    },
    onError: () => {
      toast.error("Erro encontrado, por favor tente novamente.");
    },
  });

  async function handleCreateMachine(data: FormData) {
    createMachineMutation.mutateAsync({
      name: data.name,
      quantity: data.quantity,
      image: data.image,
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCreateMachine)} className="space-y-4">
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
            {...register("quantity", {
              required: "Defina a quantidade disponível",
              min: {
                message: "A quantidade deve ser maior que 0.",
                value: 0,
              },
            })}
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
          rules={{ required: { value: true, message: "Selecione uma imagem" } }}
          defaultValue={null as unknown as FileList}
          render={({ field }) => (
            <>
              <Label
                htmlFor="image"
                tabIndex={0}
                className={`relative flex z-30 flex-col w-full h-20 border 
                  border-dashed rounded-md cursor-pointer border-gray-300 
                  hover:border-ring 
                  hover:bg-primary/10 transition-colors 
                  focus:outline-none 
                  focus:ring-1 
                  focus:ring-primary
                  focus:bg-primary/10
                  ${previewImage && "bg-primary/10"}`}
              />
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="mt-1 sr-only"
                aria-label="Carregar uma imagem"
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
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
                <span className="text-sm text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  Clique ou arraste para enviar uma imagem
                </span>
              )}
            </>
          )}
        />
      </div>
      {errors.image?.message && (
        <p className="text-red-500 text-sm font-light !mt-0">
          {errors.image?.message}
        </p>
      )}
      <Button
        type="submit"
        disabled={createMachineMutation.isPending}
        className="min-w-44"
      >
        {createMachineMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          " Adicionar Máquina"
        )}
      </Button>
    </form>
  );
}

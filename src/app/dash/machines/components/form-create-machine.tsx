"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  price_per_day: number;
  price_per_km: number;
  image: FileList;
};

export function FormCreateMachine() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { register, handleSubmit, control, reset, watch } = useForm<FormData>();
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

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      if (!data.image || data.image.length === 0) {
        toast.error("Por favor, selecione uma imagem.");
        return;
      }

      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price_per_day", String(data.price_per_day));
      formData.append("price_per_km", String(data.price_per_km));
      formData.append("image", imageFile);

      const response = await fetch("/api/create-machine", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao criar máquina");
      }

      reset();
      setPreviewImage(null);
      setIsLoading(false);
      toast.success("Máquina adicionada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["list-machines"] });
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao adicionar a máquina.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        </div>
        <div className="w-full lg:flex-1">
          <Label htmlFor="price_per_day" className="font-medium text-gray-700">
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
        </div>
        <div className="w-full lg:flex-1">
          <Label htmlFor="price_per_km" className="font-medium text-gray-700">
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
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 relative border rounded-md border-gray-300">
        <Controller
          name="image"
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
      </div>

      <Button type="submit" disabled={isLoading} className="min-w-44">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          " Adicionar Máquina"
        )}
      </Button>
    </form>
  );
}

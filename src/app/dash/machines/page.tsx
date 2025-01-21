"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type Machine = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type FormData = {
  name: string;
  price: number;
  image: FileList;
};

export default function ManageMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { register, handleSubmit, control, reset, watch } = useForm<FormData>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const watchimage = watch("image");

  useEffect(() => {
    const storedMachines = localStorage.getItem("machines");
    if (storedMachines) {
      setMachines(JSON.parse(storedMachines));
    }
  }, []);

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
    if (!data.image || data.image.length === 0) {
      toast.error("Erro", {
        description: "Por favor, selecione uma image para a máquina.",
      });
      return;
    }

    const imageFile = data.image[0];
    const formImageData = new FormData();
    formImageData.append("image", imageFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formImageData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadedImageUrl(result.url);
      } else {
        toast.error(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error("Erro no upload:", error);
    }

    const newMachine: Machine = {
      id: Date.now(),
      name: data.name,
      price: Number(data.price),
      image: uploadedImageUrl!,
    };

    const updatedMachines = [...machines, newMachine];
    setMachines(updatedMachines);
    localStorage.setItem("machines", JSON.stringify(updatedMachines));
    reset();
    setPreviewImage(null);
    toast.success("Máquina adicionada", {
      description: `${data.name} foi adicionada com sucesso.`,
    });
  }

  const deleteMachine = (id: number) => {
    const updatedMachines = machines.filter((m) => m.id !== id);
    setMachines(updatedMachines);
    localStorage.setItem("machines", JSON.stringify(updatedMachines));
    toast.success("Máquina removida", {
      description: "A máquina foi removida com sucesso.",
    });
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gerenciar Máquinas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Máquina</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-medium text-gray-700">
                Nome da Máquina
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <div>
                <Label htmlFor="price" className="font-medium text-gray-700">
                  Preço por Dia (R$)
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", {
                    required: "O preço é obrigatório",
                    min: {
                      message: "O preço deve ser maior que 0.",
                      value: 0,
                    },
                  })}
                  className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
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
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed  rounded-md cursor-pointer border-gray-300 hover:border-gray-400 hover:bg-primary/10 transition-colors ${
                          previewImage && "bg-primary/10"
                        }`}
                      />

                      {previewImage ? (
                        <Image
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={100}
                          className="rounded-md object-cover h-[100px] w-[200px] absolute"
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
            </div>

            <Button type="submit">Adicionar Máquina</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Máquinas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>image</TableHead>
                <TableHead>name</TableHead>
                <TableHead>Preço por Dia</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((Machine) => (
                <TableRow key={Machine.id}>
                  <TableCell>
                    <Image
                      src={Machine.image || "/placeholder.svg"}
                      alt={Machine.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{Machine.name}</TableCell>
                  <TableCell>R$ {Machine.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteMachine(Machine.id)}
                      variant="destructive"
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

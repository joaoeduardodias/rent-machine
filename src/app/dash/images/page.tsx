"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type ImageType = {
  id: number
  nome: string
  url: string
}

export default function GerenciarImages() {
  const [images, setImages] = useState<ImageType[]>([])
  const { register, handleSubmit, reset } = useForm<ImageType>()

  useEffect(() => {
    const storedImages = localStorage.getItem("images")
    if (storedImages) {
      setImages(JSON.parse(storedImages))
    }
  }, [])

  const onSubmit = (data: ImageType) => {
    const newImage = { ...data, id: Date.now() }
    const updatedImages = [...images, newImage]
    setImages(updatedImages)
    localStorage.setItem("images", JSON.stringify(updatedImages))
    reset()
    toast.success("Image adicionada",{ description: `${data.nome} foi adicionada com sucesso.`})
  }

  const deleteImage = (id: number) => {
    const updatedImages = images.filter((img) => img.id !== id)
    setImages(updatedImages)
    localStorage.setItem("images", JSON.stringify(updatedImages))
    toast("Image removida",{description: "A Image foi removida com sucesso."})
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gerenciar Images</h1>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome da Image
              </label>
              <Input id="nome" {...register("nome", { required: true })} className="mt-1" />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL da Image
              </label>
              <Input id="url" {...register("url", { required: true })} className="mt-1" />
            </div>
            <Button type="submit">Adicionar Image</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border rounded-lg overflow-hidden">
                <Image src={image.url || "/placeholder.svg"} alt={image.nome} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="font-semibold">{image.nome}</p>
                  <Button onClick={() => deleteImage(image.id)} variant="destructive" className="mt-2">
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


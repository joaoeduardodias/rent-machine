/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, Truck } from "lucide-react"
import Link from "next/link"

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gerenciar Máquinas</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Máquinas</div>
            <p className="text-xs text-muted-foreground">Adicione, edite ou remova máquinas do catálogo.</p>
            <Link href="/dashboard/maquinas">
              <Button className="mt-4 w-full">Ir para Máquinas</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gerenciar Imagens</CardTitle>
            <Image  className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Imagens</div>
            <p className="text-xs text-muted-foreground">Faça upload e gerencie imagens para o site.</p>
            <Link href="/dashboard/imagens">
              <Button className="mt-4 w-full">Ir para Imagens</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


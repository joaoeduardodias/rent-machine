"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Truck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({ message: "O email é obrigatório" })
    .email({ message: "Digite um email válido" }),
  password: z
    .string({ message: "Senha é obrigatório" })
    .min(8, { message: "A senha deve ser maior que 08 caracteres" }),
});

type SignInSchemaProps = z.infer<typeof signInSchema>;

export default function SingInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn(data: SignInSchemaProps) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result || result.error) {
        toast.error("Usuário ou senha inválidos. Tente novamente.", {
          position: "top-right",
          icon: <CircleX />,
        });
      } else {
        router.push("/dash");
      }
    } catch (error) {
      toast.error("Erro encontrado, por favor tente novamente: " + error, {
        position: "top-right",
        icon: <CircleX />,
      });
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Truck className="h-10 w-10 text-yellow-500" />
        </div>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Entre para acessar o dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2 mt-4">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button className="w-full mt-6" type="submit">
            {/* {isLoading ? "Entrando..." : "Entrar"} */}
            Entrar
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full text-gray-600">
          Não tem uma conta? Entre em contato com o administrador.
        </p>
      </CardFooter>
    </Card>
  );
}

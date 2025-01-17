"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRentMachine } from "@/hooks/use-rent-machine";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";

type FormData = {
  meioPagamento: string;
  parcelas: number;
  name: string;
  email: string;
  telefone: string;
  message: string;
};
const meiosPagamento = [
  { id: "pix", nome: "PIX" },
  { id: "debito", nome: "Cartão de Débito" },
  { id: "credito", nome: "Cartão de Crédito" },
];

export default function Contact() {
  const { currentMachine } = useRentMachine();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      telefone: "",
      parcelas: 1,
    },
  });
  const registerWithMask = useHookFormMask(register);
  const paymentMethod = watch("meioPagamento");
  // const telefoneMask = useMaskito({
  //   options: {
  //     mask: [
  //       "(",
  //       /\d/,
  //       /\d/,
  //       ")",
  //       " ",
  //       /\d/,
  //       /\d/,
  //       /\d/,
  //       /\d/,
  //       /\d/,
  //       "-",
  //       /\d/,
  //       /\d/,
  //       /\d/,
  //       /\d/,
  //     ],
  //   },
  // });

  function onSubmit(data: FormData) {
    console.log(data, "Maquina: " + currentMachine);
    toast.success("Formulário enviado com sucesso!", {
      description:
        "Enviamos um email para nossos representantes, entraremos em contato em breve.",
    });
  }

  return (
    <main className="min-h-screen bg-yellow-50">
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
            Entre em Contato
          </h2>
          <div className="max-w-4xl mx-auto bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-2 md:space-y-6"
                >
                  <div>
                    <Label className="ml-1" htmlFor="name">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: "O nome é obrigatório",
                      })}
                      className="mt-1"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="ml-1" htmlFor="email">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "E-mail inválido",
                        },
                      })}
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="ml-1" htmlFor="telefone">
                      Telefone
                    </Label>

                    <Input
                      id="telefone"
                      className="mt-1"
                      {...registerWithMask("telefone", ["(99) 99999-9999"], {
                        placeholder: "",
                      })}
                    />
                    {errors.telefone && <span>{errors.telefone.message}</span>}
                  </div>
                  <div className="mb-8 flex gap-1">
                    <div className="w-full">
                      <Label className="ml-1" htmlFor="meioPagamento">
                        Meio de Pagamento
                      </Label>
                      <Controller
                        name="meioPagamento"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecione o meio de pagamento" />
                            </SelectTrigger>
                            <SelectContent>
                              {meiosPagamento.map((meio) => (
                                <SelectItem key={meio.id} value={meio.id}>
                                  {meio.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {paymentMethod === "credito" && (
                      <div className="">
                        <Label className="ml-1 " htmlFor="parcelas">
                          Parcelas
                        </Label>
                        <Controller
                          name="parcelas"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              value={String(field.value)}
                            >
                              <SelectTrigger className="w-full min-w-14 md:min-w-28">
                                <SelectValue placeholder="Selecione o número de parcelas" />
                              </SelectTrigger>
                              <SelectContent>
                                {[...Array(10)].map((_, i) => (
                                  <SelectItem value={String(i + 1)} key={i}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="ml-1" htmlFor="message">
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className="w-full resize-none"
                      placeholder="Informações adicionais..."
                      rows={3}
                    ></Textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full py-6">
                    Enviar mensagem
                    <ArrowRight className="ml-1" />
                  </Button>
                </form>
              </div>
              <div className="bg-white max-h-96 md:mt-7 p-6 rounded-lg shadow-md">
                <h3 className="text-base md:text-2xl text-center md:text-left font-bold text-gray-800 mb-6">
                  Informações de Contato
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="text-yellow-500 mr-2 size-5 md:size-6" />
                    <p className="text-sm md:text-base">(67) 99890-8771</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-yellow-500 mr-2 size-5 md:size-6" />
                    <p className="text-sm md:text-base">
                      contato@construtaluga.com
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-yellow-500 mr-2 size-5 md:size-6" />
                    <p className="text-sm md:text-base">
                      Rua das Máquinas, 123 - São Paulo, SP
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="text-center md:text-left md:text-xl font-semibold text-gray-800 mb-4">
                    Horário de Atendimento
                  </h4>
                  <p className="text-center text-sm md:text-base">
                    Segunda a Sexta: 8h às 18h
                  </p>
                  <p className="text-center text-sm md:text-base">
                    Sábado: 8h às 12h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

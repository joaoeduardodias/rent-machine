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
import { env } from "@/env";
import { useRentMachine } from "@/hooks/use-rent-machine";
import { createRent } from "@/http/create-rent";
import { deleteRent } from "@/http/delete-rent";
import { sendOwnerConfirmRent } from "@/http/email/send-owner-confirm-rent";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  CircleCheckBig,
  Mail,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";

type FormData = {
  paymentMethod: string;
  installments: number;
  nameClient: string;
  email: string;
  telephone: string;
  message: string;
  cep: string;
  period: string;
  address: string;
  machine: string;
  methodPayment: string;
  number: string;
};

const paymentMethods = [
  { id: "pix", name: "PIX" },
  { id: "debito", name: "Cartão de Débito" },
  { id: "credito", name: "Cartão de Crédito" },
];

export default function ConfirmRent() {
  const { currentMachine, startDate, endDate, currentMachineName } =
    useRentMachine();
  const router = useRouter();

  const createRentMutation = useMutation({
    mutationFn: createRent,
    mutationKey: ["create-rent-status-pending"],
  });
  const deleteRentMutation = useMutation({
    mutationFn: deleteRent,
    mutationKey: ["delete-rent-on-error"],
  });

  const sendMailMutation = useMutation({
    mutationKey: ["send-email-owner"],
    mutationFn: sendOwnerConfirmRent,
    onError: async (_, variables) => {
      deleteRentMutation.mutateAsync({ id: variables.idRent });
    },
    onSuccess: async () => {
      router.push("/confirmation-rent");
    },
  });

  useEffect(() => {
    if (!currentMachine) {
      router.push("/rent");
    }
  }, [currentMachine, router]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      telephone: "",
      installments: 1,
    },
  });
  const registerWithMask = useHookFormMask(register);
  const paymentMethod = watch("paymentMethod");
  const cepInput = watch("cep");
  const extractNumbers = String(cepInput).replace(/\D/g, "");

  if (cepInput && extractNumbers.length === 8) {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${extractNumbers}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setValue(
            "address",
            `${data.localidade}  ${data.bairro}  ${data.logradouro}` || ""
          );
        } else {
          console.error("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    };
    fetchAddress();
  }

  async function handleSubmitMessageConfirmRent(data: FormData) {
    try {
      const newData = {
        ...data,
        machine: currentMachineName,
        startDate,
        endDate,
        name: env.NEXT_PUBLIC_NAME_OWNER,
        emailOwner: env.NEXT_PUBLIC_EMAIL_OWNER,
      };
      const rent = await createRentMutation.mutateAsync({
        address: newData.address,
        cep: newData.cep,
        email: newData.email,
        client: newData.nameClient,
        endDate: newData.endDate!,
        startDate: newData.startDate!,
        machineId: currentMachine,
        number: Number(newData.number),
        paymentMethod: newData.paymentMethod,
        value: 0,
        message: newData.message,
      });

      sendMailMutation.mutateAsync({ ...newData, idRent: rent.id });
    } catch (error: unknown) {
      console.log(error);
      toast.error("Erro encontrado, por favor tente novamente.");
    }
  }

  return (
    <main className="flex-grow py-5 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
          Confirme sua Reserva
        </h2>
        <div className="max-w-4xl mx-auto bg-yellow-100 p-4 md:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form
              onSubmit={handleSubmit(handleSubmitMessageConfirmRent)}
              className="space-y-2 md:space-y-6"
            >
              <div>
                <Label className="ml-1" htmlFor="nameClient">
                  Nome
                </Label>
                <Input
                  id="name"
                  {...register("nameClient", {
                    required: "O nome é obrigatório",
                  })}
                  className="py-5 "
                />
                {errors.nameClient && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nameClient.message}
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
                  className="py-5"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="ml-1" htmlFor="telephone">
                  Telefone
                </Label>

                <Input
                  id="telephone"
                  className="py-5"
                  {...registerWithMask("telephone", ["(99) 99999-9999"], {
                    required: "O Telefone é obrigatório",
                    placeholder: "",
                  })}
                />
                {errors.telephone && <span>{errors.telephone.message}</span>}
              </div>
              <div>
                <Label className="ml-1" htmlFor="cep">
                  Cep
                </Label>
                <Input
                  id="cep"
                  {...registerWithMask("cep", ["99999-999"], {
                    required: "Cep é obrigatório",
                    placeholder: "",
                  })}
                  className="py-5"
                />
                {errors.cep && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cep.message}
                  </p>
                )}
              </div>
              <div className="mb-8 flex gap-1">
                <div className="w-full">
                  <Label className="ml-1" htmlFor="address">
                    Endereço
                  </Label>
                  <Input
                    id="address"
                    disabled={!cepInput}
                    {...register("address", {
                      required: "Endereço é obrigatório",
                    })}
                    className="flex-1  py-5"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="ml-1" htmlFor="number">
                    Número
                  </Label>
                  <Input
                    id="number"
                    type="number"
                    disabled={!cepInput}
                    {...register("number", {
                      required: "Número é obrigatório",
                      valueAsNumber: true,
                    })}
                    className="w-full min-w-14 md:min-w-28 py-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.number.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-8 flex gap-1">
                <div className="w-full">
                  <Label className="ml-1" htmlFor="paymentMethod">
                    Meio de Pagamento
                  </Label>
                  <Controller
                    name="paymentMethod"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="flex-1 py-5">
                          <SelectValue placeholder="Selecione o meio de pagamento" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id}>
                              {method.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {paymentMethod === "credito" && (
                  <div className="">
                    <Label className="ml-1 " htmlFor="installments">
                      Parcelas
                    </Label>
                    <Controller
                      name="installments"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={String(field.value)}
                        >
                          <SelectTrigger className="w-full min-w-14 md:min-w-28 py-5">
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
                  rows={2}
                ></Textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={sendMailMutation.isPending}
                className="w-full py-5"
              >
                {sendMailMutation.isPending
                  ? "Enviando ..."
                  : "Confirmar Reserva"}
                <CircleCheckBig className="ml-1" />
              </Button>
            </form>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="md:text-2xl text-center md:text-left font-bold text-gray-800 mb-6">
                Confirme seus dados
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Truck className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    Máquina:
                    <span className="text-muted-foreground text-sm ml-1">
                      {currentMachineName}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-yellow-500 mr-2 size-5 md:size-6" />
                  <p className="text-sm md:text-base">
                    Período do aluguel:
                    <span className="text-muted-foreground text-sm ml-1">
                      {`${format(startDate!, "dd/MM/yyyy", {
                        locale: ptBR,
                      })} -
                          ${format(endDate!, "dd/MM/yyyy", { locale: ptBR })}`}
                    </span>
                  </p>
                </div>
              </div>
              <h4 className="md:text-2xl text-center md:text-left font-bold text-gray-800 mb-6">
                Informações de Contato
              </h4>
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
                <h4 className="md:text-2xl text-center md:text-left font-bold text-gray-800 mb-6">
                  Horário de Atendimento
                </h4>
                <p className="text-center text-sm md:text-left md:text-base">
                  Segunda a Sexta: 8h às 18h
                </p>
                <p className="text-center text-sm md:text-left md:text-base">
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

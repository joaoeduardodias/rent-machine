"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendMailClient } from "@/http/email/send-mail-client";
import { updateRent } from "@/http/update-rent";
import { formatCurrency } from "@/utils/format-currency";
import { useMutation } from "@tanstack/react-query";
import { MailPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  id: string;
  value: string;
  message?: string;
  status: "approved" | "pending" | "canceled";
};

interface FormSendMailProps {
  emailClient: string;
  idRent: string;
  name: string;
  machine: string;
}

export function FormSendMail({
  emailClient,
  idRent,
  machine,
  name,
}: FormSendMailProps) {
  const [inputValue, setInputValue] = useState("");
  const updateRentMutation = useMutation({
    mutationKey: ["update-mutation-client"],
    mutationFn: updateRent,
  });

  const sendMailMutation = useMutation({
    mutationKey: ["send-email-client"],
    mutationFn: sendMailClient,
    onError: async () => {
      toast.error("Erro encontrado, por favor tente novamente.");
      await updateRentMutation.mutateAsync({
        id: idRent,
        value: 0,
        status: "pending",
      });
    },
    onSuccess: () => {
      toast.success("E-mail enviado com sucesso!");
    },
  });

  async function handleSubmitMessageConfirmRent(data: FormData) {
    try {
      await updateRentMutation.mutateAsync({
        id: idRent,
        value: Number(data.value.replace(/\D/g, "")),
        status: "pending",
      });

      await sendMailMutation.mutateAsync({
        emailClient,
        idRent,
        name,
        machine,
        value: Number(data.value.replace(/\D/g, "")),
        message: data.message,
      });
    } catch (error: unknown) {
      console.log(error);
      toast.error("Erro encontrado, por favor tente novamente.");
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const formattedValue = formatCurrency(e.target.value);
    setInputValue(formattedValue);
    onChange(formattedValue); // update o react-hook-form
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitMessageConfirmRent)}
      className="space-y-2 md:space-y-6"
    >
      <div>
        <Label className="ml-1" htmlFor="value">
          Valor total (R$)
        </Label>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Input
              className="py-5"
              value={inputValue}
              onChange={(e) => handleChange(e, field.onChange)}
            />
          )}
        />
        {errors.value && (
          <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={sendMailMutation.isPending}
        className="w-full py-5"
      >
        {sendMailMutation.isPending ? "Enviando ..." : "Enviar orçamento"}
        <MailPlus className="ml-1" />
      </Button>
    </form>
  );
}

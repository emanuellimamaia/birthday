"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { adicionarConvidado } from "@/app/actions/guest";
import { Plus, Trash } from "lucide-react";

type FormData = {
  guests: { name: string }[];
};

export function AddPeoples() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { control, handleSubmit, watch, reset, setValue } = useForm<FormData>({
    defaultValues: {
      guests: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const watchedGuests = watch("guests");

  const addNewGuest = () => {
    append({ name: "" });
  };

  const removeGuest = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage(null);

    const validNames = data.guests
      .map((guest) => guest.name.trim())
      .filter((name) => name !== "");

    if (validNames.length === 0) {
      setMessage({
        type: "error",
        text: "Adicione pelo menos um nome válido.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await Promise.all(
        validNames.map((name) => adicionarConvidado({ name }))
      );

      const erros = res.filter((result) => !result.success);

      if (erros.length === 0) {
        setMessage({
          type: "success",
          text: `${validNames.length} presença(s) confirmada(s) com sucesso! 🎉`,
        });
        reset({ guests: [{ name: "" }] });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage({
          type: "error",
          text: `Erro ao confirmar ${erros.length} presença(s). Tente novamente.`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Erro inesperado. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validGuestCount =
    watchedGuests?.filter((guest) => guest.name.trim() !== "").length || 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 space-y-6"
      >
        <h3 className="text-white font-semibold text-2xl text-center">
          ✨ Confirme sua presença ✨
        </h3>
        <p className="text-white/90 text-center">
          Adicione os nomes dos convidados que irão comparecer.
        </p>
        {message && (
          <div
            className={`p-4 rounded-lg text-center ${
              message.type === "success"
                ? "bg-green-500/20 text-green-100 border border-green-300/30"
                : "bg-red-500/20 text-red-100 border border-red-300/30"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-white/90 text-sm font-medium">
              Convidados
            </label>
            <Button
              type="button"
              onClick={addNewGuest}
              className="bg-green-500/70 text-white hover:bg-green-500/80 px-4 py-2 text-sm"
            >
              <Plus /> Adicionar
            </Button>
          </div>

          {/* Lista de convidados */}
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  {...control.register(`guests.${index}.name` as const)}
                  className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                  placeholder="Nome completo do convidado"
                />
                <Button
                  type="button"
                  onClick={() => removeGuest(index)}
                  disabled={fields.length === 1}
                  className="bg-red-500/70 text-white hover:bg-red-500/80 disabled:opacity-50 disabled:cursor-not-allowed px-4"
                >
                  <Trash />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            disabled={isLoading || validGuestCount === 0}
            className="bg-white/30 text-white hover:bg-white/40 disabled:opacity-50 px-8 py-3 text-lg font-semibold rounded-xl"
          >
            {isLoading
              ? "Confirmando..."
              : `Confirmar ${validGuestCount} presença(s)`}
          </Button>
        </div>
      </form>
    </div>
  );
}

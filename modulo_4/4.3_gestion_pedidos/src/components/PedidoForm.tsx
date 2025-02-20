"use client";
import { PedidoEntity } from "@/model";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { useCallback, useEffect, useState } from "react";

interface Props {
  pedido: PedidoEntity[];
}

export default function PedidoForm({ pedido }: Props) {
  const [progress, setProgress] = useState(0);

  const getPedidoProgress = useCallback(() => {
    const total = pedido.length;
    const valid = pedido.filter((item) => item.status === "Válido").length;
    return (valid / total) * 100;
  }, [pedido]);

  useEffect(() => {
    setProgress(getPedidoProgress());
  }, [getPedidoProgress]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Pedido enviado");
  };

  return (
    <div className="border border-gray-200 shadow-md rounded-md   max-w-4xl w-full p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Input
            label="Número de pedido"
            id="numero_pedido"
            name="numero_pedido"
            isRequired
          />
          <Input label="Proveedor" id="proveedor" name="proveedor" isRequired />
          <DatePicker
            label="Fecha de pedido"
            id="fecha_pedido"
            name="fecha_pedido"
            isRequired
          />
        </div>
        <div className="flex items-center justify-between">
          <Input
            label="Importe total"
            id="importe"
            name="importe"
            className="max-w-44 w-full"
            endContent="€"
            value={pedido
              .reduce((acc, item) => acc + item.import, 0)
              .toString()}
            isRequired
          />
          <Button
            isDisabled={progress < 100}
            size="lg"
            color="primary"
            variant="ghost"
            type="submit"
          >
            Enviar
          </Button>
        </div>
        <Progress
          value={progress}
          minValue={0}
          maxValue={100}
          color={`${progress === 100 ? "success" : "primary"}`}
        />
      </form>
    </div>
  );
}

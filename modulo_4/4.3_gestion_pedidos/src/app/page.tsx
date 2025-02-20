"use client";
import PedidoForm from "@/components/PedidoForm";
import PedidoTable from "@/components/PedidoTable";
import { PedidoEntity } from "@/model";
import { useEffect, useState } from "react";

const getPedidos = async () => {
  return [
    {
      key: "1",
      status: "Válido",
      description: "Reactivos maquinaria",
      import: 2345,
    },
    {
      key: "2",
      status: "Pendiente",
      description: "Recambios de impresión",
      import: 135,
    },
    {
      key: "3",
      status: "Pendiente",
      description: "Soportes plataforma",
      import: 540,
    },
  ];
};
export default function Home() {
  const [pedido, setPedido] = useState<PedidoEntity[]>([]);

  const fetchPedidos = async () => {
    const data = await getPedidos();

    if (data) {
      setPedido(data);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <main className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold ">Pedido a proveedor</h1>
      <PedidoForm pedido={pedido} />
      <PedidoTable pedido={pedido} setPedido={setPedido} />
    </main>
  );
}

"use client";

import { PedidoEntity } from "@/model";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { useState } from "react";

const columns = [
  { key: "status", title: "Estado" },
  { key: "description", title: "Descripción" },
  { key: "import", title: "Importe" },
];

interface Props {
  pedido: PedidoEntity[];
  setPedido: (pedido: PedidoEntity[]) => void;
}

export default function PedidoTable({ pedido, setPedido }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([] as string[]));

  const handleValidate = () => {
    if (pedido) {
      setPedido(
        pedido.map((item) => {
          if (selectedKeys.has(item.key) && item.status === "Pendiente") {
            return {
              ...item,
              status: "Válido",
            };
          }
          return item;
        })
      );
    }
  };

  const handleInvalidate = () => {
    if (pedido) {
      setPedido(
        pedido.map((item) => {
          if (selectedKeys.has(item.key) && item.status === "Válido") {
            return {
              ...item,
              status: "Pendiente",
            };
          }
          return item;
        })
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Button color="primary" variant="ghost" onPress={handleValidate}>
          Validar
        </Button>
        <Button color="danger" variant="ghost" onPress={handleInvalidate}>
          Invalidar
        </Button>
      </div>
      <Table
        aria-label="Detalles del pedido"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.title}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={pedido || []}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

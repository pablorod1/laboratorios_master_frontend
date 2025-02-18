"use client";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const selectedItems = cartItems.filter((item) => item.selected);

  return (
    <div>
      <h1 className="text-2xl text-blue-500 font-bold mb-6">Checkout</h1>
      <div className="flex flex-col flex-1 gap-4">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <Image src={item.picUrl} alt={item.title} width={80} height={80} />
            <div className="flex flex-col gap-2">
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useCart } from "@/contexts/CartContext";
import { PictureInfo } from "@/lib/model";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  const { cartItems, toggleCartItem, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const handleDelete = (picture: PictureInfo) => {
    toggleCartItem(picture);
  };

  const selectedItems = cartItems.filter((item) => item.selected);

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  return (
    <div
      className={`transition-all duration-300 flex  flex-col gap-4 w-16 border-l-4 border-gray-200 p-4 ${
        showCart ? "w-96" : ""
      }`}
    >
      <div className="flex flex-nowrap items-center gap-4 overflow-hidden">
        <button onClick={toggleCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
          </svg>
        </button>
        {cartItems.length > 0 && (
          <button onClick={clearCart} className="text-red-500">
            Vaciar carrito
          </button>
        )}
      </div>
      {showCart && (
        <div className="flex flex-col h-full">
          <div className="flex flex-col flex-1 gap-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Image
                  src={item.picUrl}
                  alt={item.title}
                  width={80}
                  height={80}
                />
                <div className="flex flex-col gap-2">
                  <p>{item.title}</p>
                </div>
                <button onClick={() => handleDelete(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <Link
            className="w-full flex justify-center items-center bg-blue-500 rounded-lg px-4 py-2 text-white"
            href="/checkout"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

"use client";
import { PictureInfo } from "@/lib/model";
import React, { createContext, useContext, useState } from "react";

// Define the structure for cart items
interface CartItem {
  id: string;
  picUrl: string;
  title: string;
  selected: boolean;
}

// Define the context interface
interface CartContextType {
  cartItems: CartItem[];
  toggleCartItem: (picture: PictureInfo) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleCartItem = (picture: PictureInfo) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === picture.id);

      if (existingItem) {
        // If item exists, toggle its selected state
        return prevItems.map((item) =>
          item.id === picture.id ? { ...item, selected: !item.selected } : item
        );
      } else {
        // If item doesn't exist, add it to cart
        return [
          ...prevItems,
          {
            id: picture.id,
            picUrl: picture.picUrl,
            title: picture.title,
            selected: true,
          },
        ];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, toggleCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

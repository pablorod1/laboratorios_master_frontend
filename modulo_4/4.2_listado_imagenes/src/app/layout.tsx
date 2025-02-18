import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/contexts/CartContext";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Listado de Imágenes",
  description: "Listado de imágenes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <main className="p-4">
            <Header />
            <section className="flex justify-between w-full">
              {children}
            </section>
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

import Cart from "@/components/Cart";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Cart />
    </>
  );
}

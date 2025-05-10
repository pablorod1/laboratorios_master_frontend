export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="p-4">
        <section className="flex justify-between ">{children}</section>
      </main>
    </>
  );
}

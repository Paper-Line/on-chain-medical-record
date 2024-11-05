import Navbar from "@/ui/navbar";

export default function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-neutral-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

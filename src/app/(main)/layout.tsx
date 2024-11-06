import Navbar from "@/ui/private/navbar";

export default function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-[#f6fbfe]"}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/ui/public/landing";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Record",
  description: "Record all your medical history using this app!"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

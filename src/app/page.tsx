"use client";

import { Hero, Navbar } from "@/ui/landing";
import { Footer } from "@/components/footer";
import { Login } from "@/components/login";

import config from "@/config";
import useAuth from "@/hooks/useAuth";

if (config.sateliteId === undefined) {
  throw new Error("Satellite ID is not defined");
}

export default function Home() {
  useAuth();

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <Navbar />
        <Hero />
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:pt-24">Medical Tracker</h1>
          <Login />
        </main>

        <Footer />
      </div>
    </>
  );
}

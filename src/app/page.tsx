"use client";

import { Hero, Navbar } from "@/ui/landing";

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
      </div>
    </>
  );
}

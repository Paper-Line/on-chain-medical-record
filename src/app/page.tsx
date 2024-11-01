"use client";

import { useEffect } from "react";
import { initSatellite } from "@junobuild/core-peer";

import AuthLayout from "@/ui/layout/AuthLayout";
import { Footer } from "@/components/footer";
import { Modal } from "@/components/modal";
import { Table } from "@/components/table";

export default function Home() {
  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true
        }
      }))();
  }, []);

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:pt-24">Medical Tracker</h1>

          <AuthLayout>
            <Table />

            <Modal />
          </AuthLayout>
        </main>

        <Footer />
      </div>
    </>
  );
}

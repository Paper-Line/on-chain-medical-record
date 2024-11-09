"use client";

import Image from "next/image";
import Link from "next/link";

import MedicalRecordIcon from "@/assets/clipboard-list.svg";

import Container from "@/components/container";
import MedicalHistoriesTable from "@/ui/private/dashboard/medicalHistories";

import { convertMillisecondsToYYYYMMDDHHMM } from "@/utils/general";
import { useFetchMedicalHistories } from "@/hooks/fetchMedicalHistories";
import useAuthStore from "@/stores/authStore";

function DashboardPage() {
  const { data: userData } = useAuthStore();

  const { medicalData } = useFetchMedicalHistories(userData?.key);

  return (
    <main className="px-5 mt-6 sm:mt-12">
      <Container className="w-full max-w-screen-xl bg-white rounded-2xl shadow-md py-6">
        <div className="px-6">
          <h1 className="text-3xl font-medium">Medical Records</h1>
          <div className="mt-4 sm:mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex flex-row space-x-1 py-0.5 px-3 bg-teal-50 border border-teal-100 rounded-xl">
              <Image src={MedicalRecordIcon} alt="medical-record" width={16} height={16} />
              <p className="text-teal-500">{medicalData?.length || 0} Medical Data</p>
            </div>
            <p className="text-neutral-500 hidden sm:block">•</p>
            <p className="text-neutral-800">Last update, {convertMillisecondsToYYYYMMDDHHMM(new Date().getTime())}</p>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-200 my-6" />

        <div className="px-6">
          <div className="w-fit py-2 px-5 rounded-lg bg-emerald-500 text-white font-medium">
            <Link href="/dashboard/add-medical-record" className="w-full h-full">
              <p>New Medical Record</p>
            </Link>
          </div>
        </div>
      </Container>

      <Container className="mt-4 w-full max-w-screen-xl bg-white rounded-2xl shadow-md py-6">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start px-5">
          <div>
            <h5 className="text-2xl font-semibold">My Medical Records</h5>
            <p>There is few of your medical records</p>
          </div>
          <div>date filters</div>
        </div>

        <div className="mt-5 w-full">
          {/* <ExampleReadWritePage /> */}
          <MedicalHistoriesTable />
        </div>
      </Container>
    </main>
  );
}

export default DashboardPage;

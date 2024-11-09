"use client";

import { Table } from "@/components/table";

import { getUserMedicalHistories } from "@/server/controllers/user/medicalHistories";
import useAuthStore from "@/stores/authStore";
import { useEffect, useState } from "react";

export default async function MedicalHistoriesTable() {
  const { data: userData } = useAuthStore();

  const [medicalData, setMedicalData] = useState([]);

  const handleCall = async () => {
    const medicalHistories = await getUserMedicalHistories({
      userCode: userData.key
    });

    setMedicalData(medicalHistories as any);
  };

  if (!userData?.key) return <></>;

  useEffect(() => {
    if (userData?.key) {
      handleCall();
    }
  }, [userData]);

  const medicalRecordColumns = () => {
    return [
      {
        name: "No",
        selector: (_: any, index: number) => <p>{(Number(1) - 1) * Number(100) + index + 1}</p>,
        center: "true",
        width: "50px"
      },
      {
        name: "Code",
        selector: (row: any) => <p>{row.code}</p>,
        maxWidth: "300px"
      },
      {
        name: "Medical Record Date",
        selector: (row: any) => <p className="text-pretty font-bold">{row?.createdAt}</p>,
        maxWidth: "300px"
      },
      {
        name: "Disease",
        selector: (row: any) => <p>{row.diseaseComplaint}</p>,
        maxWidth: "300px"
      },
      {
        name: "Place",
        selector: (row: any) => <p>{row.place}</p>
      }
      // {
      //   name: "",
      //   selector: (row: any) => <p className="font-medium text-teal-500 underlined">View Detail</p>
      // }
    ];
  };

  return (
    <Table
      fixedHeader
      columns={medicalRecordColumns()}
      data={medicalData}
      defaultSortAsc={false}
      pagination={false}
      progressPending={false}
      striped
    />
  );
}

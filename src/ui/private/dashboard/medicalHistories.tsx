"use client";

import { useState } from "react";

import { Modal } from "@/components/modal";
import { Table } from "@/components/table";

import { bigIntStampToUniversalStamp, convertMillisecondsToYYYYMMDDHHMM } from "@/utils/general";

import { useFetchMedicalHistories } from "@/hooks/fetchMedicalHistories";
import useAuthStore from "@/stores/authStore";

export default async function MedicalHistoriesTable() {
  const { data: userData } = useAuthStore();

  const { medicalData } = useFetchMedicalHistories(userData?.key);

  const [selectedData, setSelectedData] = useState<any>();

  const handleSelectRow = (data: any) => {
    setSelectedData({
      ...data.data,
      created_at: data.created_at
    });
  };

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
        selector: (row: any) => <p>{row.data?.code}</p>,
        maxWidth: "300px"
      },
      {
        name: "Medical Record Date",
        selector: (row: any) => (
          <p className="text-pretty font-bold">{convertMillisecondsToYYYYMMDDHHMM(bigIntStampToUniversalStamp(row?.created_at)) || "-"}</p>
        ),
        maxWidth: "300px"
      },
      {
        name: "Disease",
        selector: (row: any) => <p>- {row.data?.diseaseComplaints[0]}</p>,
        maxWidth: "300px"
      },
      {
        name: "Place",
        selector: (row: any) => <p>{row.data?.place}</p>
      },
      {
        name: "",
        selector: (row: any) => (
          <button className="font-medium text-teal-500 underlined" onClick={() => handleSelectRow(row)}>
            View Detail
          </button>
        )
      }
    ];
  };

  return (
    <>
      <Table
        fixedHeader
        columns={medicalRecordColumns()}
        data={medicalData}
        defaultSortAsc={false}
        pagination={false}
        progressPending={false}
        pointer
        striped
      />

      <Modal
        title="Medical Record Detail"
        isOpen={!!selectedData}
        onClose={() => setSelectedData(null)}
        content={
          <div className="w-full flex flex-col md:flex-row gap-5 justify-between">
            <div className="w-full md:w-1/2 flex flex-col gap-y-4">
              <div>
                <label className="text-sm">Code</label>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <p>{selectedData?.code}</p>
                </div>
              </div>
              <div>
                <label className="text-sm">Date/Time</label>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <p>{convertMillisecondsToYYYYMMDDHHMM(bigIntStampToUniversalStamp(selectedData?.created_at))}</p>
                </div>
              </div>
              <div>
                <label className="text-sm">Medical Centre</label>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <p>{selectedData?.place}</p>
                </div>
              </div>
              <div>
                <label className="text-sm">Cost</label>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <p>{selectedData?.cost} IDR</p>
                </div>
              </div>
              <div>
                <p>Disease / Complaint:</p>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <ul className="list-disc list-inside">
                    {selectedData?.diseaseComplaints?.map((item: any, index: number) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-y-4">
              <div>
                <p>Diagnoses:</p>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <ul className="list-disc list-inside">
                    {selectedData?.diagnosis?.map((item: any, index: number) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <p>Treatments:</p>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <ul className="list-disc list-inside">
                    {selectedData?.treatmentDescription?.map((item: any, index: number) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <p>Prescriptions:</p>
                <div className="w-full p-2.5 rounded-lg border border-gray-200">
                  <ul className="list-disc list-inside">
                    {selectedData?.medicalPrescribed?.map((item: any, index: number) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

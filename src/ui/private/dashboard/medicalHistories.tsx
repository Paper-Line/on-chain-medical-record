import { Table } from "@/components/table";

import { getUserMedicalHistories } from "@/server/controllers/user/medicalHistories";
import useAuthStore from "@/stores/authStore";

const { data: userData } = useAuthStore.getState();

export default async function MedicalHistoriesTable() {
  const medicalHistories = await getUserMedicalHistories({
    userCode: userData?.key
  });

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
      data={medicalHistories}
      defaultSortAsc={false}
      pagination={false}
      progressPending={false}
      striped
    />
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

import Container from "@/components/container";
import { Table } from "@/components/table";

import useAuthStore from "@/stores/authStore";
import { getDetailUser as getUser, updateProfile } from "@/server/users.service";
import { listOutlets, addOutlet } from "@/server/outlets.service";
import { listMedicalHistories, addMedicalHistory } from "@/server/medicalHistories.service";

import MedicalRecordIcon from "@/assets/clipboard-list.svg";

// TODO: Remove this example component and refactor the page, components, and services to fit your application's needs
// This example components to demonstrate the use of the service
const Input = ({ value, onChange }: any) => (
  <input
    className="px-2 py-1 rounded bg-white border border-gray-500"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Button = ({ onClick, children }: any) => (
  <button className="bg-blue-400 px-2 py-1 rounded" onClick={onClick}>
    {children}
  </button>
);

function ExampleReadWritePage() {
  const { data: user } = useAuthStore();

  const [profile, setProfile] = useState({}) as any;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [NIK, setNIK] = useState("");

  const [outlets, setOutlets] = useState([]);
  const [outletName, setOutletName] = useState("");
  const [outletAddress, setOutletAddress] = useState("");

  const [medicalHistories, setMedicalHistories] = useState([]);
  const [medicalOutletCode, setMedicalOutletCode] = useState("");
  const [medicalHistoryName, setMedicalHistoryName] = useState("");
  const [medicalHistoryDescription, setMedicalHistoryDescription] = useState("");

  const handleGetProfile = async () => {
    try {
      if (!user) return;

      const detailUser = await getUser(user.key);
      if (!detailUser) return;

      setProfile(detailUser);
      if (detailUser.data) {
        const { name, age, address, email, NIK } = detailUser.data as any;
        setName(name || "");
        setAge(age || "");
        setAddress(address || "");
        setEmail(email || "");
        setNIK(NIK || "");
      }
    } catch (error) {
      alert("Failed to get profile");
      console.error("Failed to get profile", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await updateProfile(profile.key, profile.version, {
        name,
        age: parseInt(age, 10),
        address,
        email,
        NIK
      });
      setProfile(updatedUser);
      alert("Profile updated");
    } catch (error) {
      alert("Failed to update profile");
      console.error("Failed to update profile:", error);
    }
  };

  const handleGetListOutlets = async () => {
    try {
      const outlets = await listOutlets();
      const { items } = outlets as any;
      setOutlets(items);
    } catch (error) {
      alert("Failed to get outlets");
      console.error("Failed to get outlets:", error);
    }
  };

  const handleAddOutlet = async () => {
    try {
      const newOutlet = (await addOutlet({
        name: outletName,
        address: outletAddress
      })) as any;
      setOutlets(outlets.concat(newOutlet));
      alert("Outlet added");
    } catch (error) {
      alert("Failed to add outlet");
      console.error("Failed to add outlet:", error);
    }
  };

  const handleGetListMedicalHistories = async () => {
    try {
      const medicalHistories = await listMedicalHistories();
      const { items } = medicalHistories as any;
      setMedicalHistories(items);
    } catch (error) {
      alert("Failed to get Medical Histories");
      console.error("Failed to get Medical Histories:", error);
    }
  };

  const handleAddMedicalHistory = async () => {
    try {
      const newMedicalHistory = (await addMedicalHistory({
        outletCode: medicalOutletCode,
        diseaseComplaints: [medicalHistoryName],
        diagnosis: [medicalHistoryDescription],
        treatmentDescription: [medicalHistoryDescription],
        medicalPrescribed: [medicalHistoryDescription],
        cost: 0,
        place: ""
      })) as any;
      setMedicalHistories(medicalHistories.concat(newMedicalHistory));
      alert("Medical History added");
    } catch (error) {
      alert("Failed to add Medical History");
      console.error("Failed to add Medical History:", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      <div className="mt-4">
        <h1 className="font-bold text-xl">Profile</h1>
        {profile ? (
          <>
            <ul>
              <li>Key: {profile.key}</li>
              <li>
                Name:
                <Input value={name} onChange={(v: any) => setName(v)} />
              </li>
              <li>
                Age:
                <Input value={age} onChange={(v: any) => setAge(v)} />
              </li>
              <li>
                Address:
                <Input value={address} onChange={(v: any) => setAddress(v)} />
              </li>
              <li>
                Email:
                <Input value={email} onChange={(v: any) => setEmail(v)} />
              </li>
              <li>
                NIK:
                <Input value={NIK} onChange={(v: any) => setNIK(v)} />
              </li>
            </ul>
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          </>
        ) : (
          <p>No Profile</p>
        )}
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-xl">Outlets</h1>
        {outlets.map((outlet: any, index) => (
          <div key={outlet.key}>
            <h2>
              {index + 1}. {outlet.key}
            </h2>
            <p>Name: {outlet.data.name}</p>
            <p>Address: {outlet.data.address}</p>
          </div>
        ))}
        <Button onClick={handleGetListOutlets}>Get List Outlets</Button>

        <div className="mt-2">
          <h1 className="font-bold">Add Outlet</h1>
          <ul>
            <li>
              Name:
              <Input value={outletName} onChange={setOutletName} />
            </li>
            <li>
              Address:
              <Input value={outletAddress} onChange={setOutletAddress} />
            </li>
          </ul>
          <Button onClick={handleAddOutlet}>Add Outlet</Button>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-xl">Medical Histories</h1>
        {medicalHistories.map((history: any, index) => (
          <div key={history.key}>
            <h2>
              {index + 1}. {history.key}
            </h2>
            <p>Disease Complaints: {history.data.diseaseComplaints}</p>
            <p>Treatment Description: {history.data.treatmentDescription}</p>
            <p>Outlet: {history.data.outletCode || "-"}</p>
          </div>
        ))}
        <Button onClick={handleGetListMedicalHistories}>Get List Medical Histories</Button>

        <div className="mt-2">
          <h1 className="font-bold">Add Medical History</h1>
          <ul>
            <li>
              Outlet Code:
              <Input value={medicalOutletCode} onChange={setMedicalOutletCode} />
            </li>
            <li>
              Name:
              <Input value={medicalHistoryName} onChange={setMedicalHistoryName} />
            </li>
            <li>
              Description:
              <Input value={medicalHistoryDescription} onChange={setMedicalHistoryDescription} />
            </li>
          </ul>
          <Button onClick={handleAddMedicalHistory}>Add Medical History</Button>
        </div>
      </div>
    </>
  );
}

const EXAMPLE_LIST = [
  {
    code: "XXXSAEW13EDAS34A",
    diseaseComplaint: "Broken Legs",
    diseaseDiagnosis: "ACL and lower leg bone is broken",
    place: "RS Aura Syifa",
    createdAt: Date.now()
  },
  {
    code: "ASJ89DASH8XHZAU",
    diseaseComplaint: "Broken Legs",
    diseaseDiagnosis: "ACL and lower leg bone is broken",
    place: "RS Aura Syifa",
    createdAt: Date.now()
  }
];

function DashboardPage() {
  const { userDetail } = useAuthStore();

  const medicalRecordColumns = useCallback(() => {
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
      },
      {
        name: "",
        selector: (row: any) => <p className="font-medium text-teal-500 underlined">View Detail</p>
      }
    ];
  }, []);
  1;

  useEffect(() => {
    if (!userDetail?.email) redirect("/account-setting");
  }, []);

  return (
    <main className="px-5 mt-6 sm:mt-12">
      <Container className="w-full max-w-screen-xl bg-white rounded-2xl shadow-md py-6">
        <div className="px-6">
          <h1 className="text-3xl font-medium">Medical Records</h1>
          <div className="mt-4 sm:mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex flex-row space-x-1 py-0.5 px-3 bg-teal-50 border border-teal-100 rounded-xl">
              <Image src={MedicalRecordIcon} alt="medical-record" width={16} height={16} />
              <p className="text-teal-500">99 Medical Data</p>
            </div>
            <p className="text-neutral-500 hidden sm:block">•</p>
            <p className="text-neutral-800">Last update, 12 Oct 2024</p>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-200 my-6" />

        <div className="px-6">
          <button className="w-fit py-2 px-5 rounded-lg bg-emerald-500 text-white font-medium">New Medical Record</button>
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
          <Table
            fixedHeader
            columns={medicalRecordColumns()}
            data={EXAMPLE_LIST}
            defaultSortAsc={false}
            pagination={false}
            progressPending={false}
            striped
          />
        </div>
      </Container>
    </main>
  );
}

export default DashboardPage;

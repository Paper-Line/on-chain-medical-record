"use client";

import { useCallback, useEffect, useState } from "react";

import Container from "@/components/container";

import useAuthStore from "@/stores/authStore";
import { getDetailUser as getUser, updateProfile } from "@/server/users.service";
import { listOutlets, addOutlet } from "@/server/outlets.service";
import { listMedicalHistories, addMedicalHistory } from "@/server/medicalHistories.service";
import { Table } from "@/components/table";

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

  return (
    <main>
      <div className="w-full h-full px-5 py-8 bg-neutral-100">
        <Container className="max-w-screen-xl">
          <button className="w-fit py-2 px-5 rounded-lg bg-emerald-500 text-white font-medium">New Medical Record</button>
          <div className="mt-3 w-full flex flex-row justify-between items-center">
            <p className="text-neutral-500">Create a new record</p>
            <div className="flex flex-row items-center space-x-1">
              <svg width="16" height="16" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="fill-neutral-500">
                <path d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 501 191C 626 191 690 275 690 375C 690 475 639 483 595 513C 573 525 558 553 559 575C 559 591 554 602 541 601C 541 601 460 601 460 601C 446 601 436 581 436 570C 436 503 441 488 476 454C 512 421 566 408 567 373C 566 344 549 308 495 306C 463 303 445 314 411 361C 400 373 384 382 372 373C 372 373 318 333 318 333C 309 323 303 307 312 293C 362 218 401 191 501 191C 501 191 501 191 501 191M 500 625C 541 625 575 659 575 700C 576 742 540 776 500 775C 457 775 426 739 425 700C 425 659 459 625 500 625C 500 625 500 625 500 625" />
              </svg>
              <p className="text-neutral-500 underline">About Medical Records</p>
            </div>
          </div>
        </Container>
      </div>

      <div>
        <Container className="max-w-screen-xl">
          <div className="w-full flex flex-row justify-between items-start p-5">
            <div>
              <h5 className="text-2xl font-semibold">My Medical Records</h5>
              <p>There is few of your medical records</p>
            </div>
            <div>date filters</div>
          </div>

          <div className="w-full p-5">
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
      </div>
    </main>
  );
}

export default DashboardPage;

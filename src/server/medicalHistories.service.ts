import { getDoc, setDoc, listDocs } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import { getOutlet } from "./outlets.service";
import { getDetailUser } from "./users.service";

export interface IMedicalHistory {
  code: string
  outletCode: string | null
  userCode: string | null
  diseaseComplaints: string[]
  diagnosis: string[]
  treatmentDescription: string[]
  medicalPrescribed: string[]
  cost: number
  place: string
}

export async function addMedicalHistory(data: {
  outletCode?: string
  userCode?: string
  diseaseComplaints: string[]
  diagnosis: string[]
  treatmentDescription: string[]
  medicalPrescribed: string[]
  cost: number
  place: string
}) {
  if (data.userCode) {
    const user = await getDetailUser(data.userCode);
    if (!user) {
      throw new Error("User not found");
    }
  }

  if (data.outletCode) {
    const outlet = await getOutlet(data.outletCode);
    if (!outlet) {
      throw new Error("Outlet not found");
    }
  }

  const code = nanoid();
  const medicalHistory = await setDoc({
    collection: "medicalHistories",
    doc: {
      key: code,
      data: {
        code,
        ...data
      }
    }
  });
  return medicalHistory;
}

export async function getMedicalHistory(code: string) {
  const medicalHistory = await getDoc({
    collection: "medicalHistories",
    key: code
  });
  return medicalHistory;
}

export async function listMedicalHistories() {
  const medicalHistories = await listDocs({
    collection: "medicalHistories"
  });
  return medicalHistories;
}
import { getDoc, setDoc, listDocs } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import { getOutlet } from "./outlets.service";

export interface IMedicalHistory {
  code: string;
  outletCode?: string;
  diseaseComplaints: string[];
  diagnosis: string[];
  treatmentDescription: string[];
  medicalPrescribed: string[];
  cost: number;
  place: string;
}

export interface IMedicalHistoryRecord {
  data: IMedicalHistory;
  key: string;
  owner: string | undefined;
  version: bigint | undefined;
  created_at: bigint | undefined;
  updated_at: bigint | undefined;
}

/**
 * Adds a new medical history to the datastore.
 * If the outletCode is provided, it will check if the outlet exists.
 * @param {Object} data - The data for the new medical history.
 * @returns {Promise<Object>} - The added medical history.
 */
export async function addMedicalHistory(data: Omit<IMedicalHistory, "code">) {
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

  return {
    data: medicalHistory.data as IMedicalHistory,
    key: medicalHistory.key,
    owner: medicalHistory.owner,
    version: medicalHistory.version,
    created_at: medicalHistory.created_at,
    updated_at: medicalHistory.updated_at
  };
}

/**
 * Gets the medical history detail.
 * @param {string} code - The code of the medical history.
 * @returns {Promise<Object>} - The medical history record.
 */
export async function getMedicalHistory(code: string) {
  const medicalHistory = await getDoc({
    collection: "medicalHistories",
    key: code
  });
  if (!medicalHistory) return null;

  return {
    data: medicalHistory.data as IMedicalHistory,
    key: medicalHistory.key,
    owner: medicalHistory.owner,
    version: medicalHistory.version,
    created_at: medicalHistory.created_at,
    updated_at: medicalHistory.updated_at
  };
}

/**
 * Lists the medical histories.
 * If the owner is provided, it will list the medical histories of the owner.
 * @param {Object} filter - The filter for the medical histories.
 * @param {string} filter.owner - The owner of the medical histories, provided as the code.
 * @returns {Promise<Object>} - The list of medical histories.
 */
export async function listMedicalHistories(filter?: { owner?: string }) {
  const owner = filter?.owner;

  const medicalHistories = await listDocs({
    collection: "medicalHistories",
    ...(owner && { owner })
  });

  return {
    data: medicalHistories.items.map((medicalHistory) => ({
      data: medicalHistory.data as IMedicalHistory,
      key: medicalHistory.key,
      owner: medicalHistory.owner,
      version: medicalHistory.version,
      created_at: medicalHistory.created_at,
      updated_at: medicalHistory.updated_at
    })),
    items_length: medicalHistories.items_length, // The number of documents - basically items.length
    items_page: medicalHistories.items_page, // If the query is paginated, at what page (starting from 0) do the items find the place
    matches_length: medicalHistories.matches_length, // The total number of matching results
    matches_pages: medicalHistories.matches_pages // If the query is paginated, the total number (starting from 0) of pages
  };
}

/**
 * Updates the medical history.
 * @param {string} code - The code of the medical history.
 * @param {bigint} version - The version of the medical history.
 * @param {Object} data - The data for the updated medical history.
 * @returns {Promise<Object>} - The updated medical history.
 */
export async function updateMedicalHistory(code: string, version: bigint, data: Partial<IMedicalHistory>) {
  const medicalHistory = await getMedicalHistory(code);
  if (!medicalHistory) {
    throw new Error("Medical history not found");
  }

  if (data.outletCode) {
    const outlet = await getOutlet(data.outletCode);
    if (!outlet) {
      throw new Error("Outlet not found");
    }
  }

  const updatedMedicalHistory = await setDoc({
    collection: "medicalHistories",
    doc: {
      key: code,
      version,
      data: {
        ...medicalHistory.data,
        ...data
      }
    }
  });

  return {
    data: updatedMedicalHistory.data as IMedicalHistory,
    key: updatedMedicalHistory.key,
    owner: updatedMedicalHistory.owner,
    version: updatedMedicalHistory.version,
    created_at: updatedMedicalHistory.created_at,
    updated_at: updatedMedicalHistory.updated_at
  };
}

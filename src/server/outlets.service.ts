import { getDoc, setDoc, listDocs, deleteDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";

export interface IOutlet {
  code: string;
  name: string;
  address: string;
}

/**
 * Adds a new outlet to the collection.
 * @param {Object} data - The data for the new outlet.
 * @returns {Promise<Object>} The added outlet.
 */
export async function addOutlet(data: Omit<IOutlet, "code">) {
  const code = nanoid();

  const outletDoc = await setDoc({
    collection: "outlets",
    doc: {
      key: code,
      data: {
        code,
        ...data
      }
    }
  });

  return {
    data: outletDoc.data as IOutlet,
    key: outletDoc.key,
    owner: outletDoc.owner,
    version: outletDoc.version,
    created_at: outletDoc.created_at,
    updated_at: outletDoc.updated_at
  };
}

/**
 * Retrieves an outlet by its code.
 * @param {string} code - The code of the outlet.
 * @returns {Promise<Object>} The retrieved outlet.
 */
export async function getOutlet(code: string) {
  const outletDoc = await getDoc({
    collection: "outlets",
    key: code
  });
  if (!outletDoc) return null;

  return {
    data: outletDoc.data as IOutlet,
    key: outletDoc.key,
    owner: outletDoc.owner,
    version: outletDoc.version,
    created_at: outletDoc.created_at,
    updated_at: outletDoc.updated_at
  };
}

/**
 * Lists all outlets.
 * @returns {Promise<Object>} The list of outlets.
 */
export async function listOutlets() {
  const outlets = await listDocs({
    collection: "outlets"
  });

  return {
    data: outlets.items.map((outletDoc) => ({
      data: outletDoc.data as IOutlet,
      key: outletDoc.key,
      owner: outletDoc.owner,
      version: outletDoc.version,
      created_at: outletDoc.created_at,
      updated_at: outletDoc.updated_at
    })),
    items_length: outlets.items_length, // The number of documents - basically items.length
    items_page: outlets.items_page, // If the query is paginated, at what page (starting from 0) do the items find the place
    matches_length: outlets.matches_length, // The total number of matching results
    matches_pages: outlets.matches_pages // If the query is paginated, the total number (starting from 0) of pages
  };
}

/**
 * Updates an outlet by its code.
 * @param {string} code - The code of the outlet.
 * @param {bigint} version - The version of the outlet.
 * @param {Object} data - The data for the updated outlet.
 * @returns {Promise<Object>} The updated outlet.
 */
export async function updateOutlet(code: string, version: bigint, data: Omit<IOutlet, "code">) {
  const outletDoc = await setDoc({
    collection: "outlets",
    doc: {
      key: code,
      version,
      data
    }
  });

  return {
    data: outletDoc.data as IOutlet,
    key: outletDoc.key,
    owner: outletDoc.owner,
    version: outletDoc.version,
    created_at: outletDoc.created_at,
    updated_at: outletDoc.updated_at
  };
}

/**
 * Deletes an outlet by its code.
 * @param {string} code - The code of the outlet.
 * @returns {Promise<string>} The deleted outlet code.
 */
export async function deleteOutlet(code: string) {
  // Get the latest doc
  const outletDoc = await getDoc({
    collection: "outlets",
    key: code
  });
  if (!outletDoc) {
    throw new Error("Outlet not found");
  }

  await deleteDoc({
    collection: "outlets",
    doc: outletDoc
  });

  return code;
}

import { getDoc, setDoc, listDocs } from "@junobuild/core-peer";
import { nanoid } from "nanoid";

export interface IOutlet {
  code: string;
  name: string;
  address: string;
}

/**
 * Adds a new outlet to the collection.
 * @param {Object} data - The data for the new outlet.
 * @param {string} data.name - The name of the outlet.
 * @param {string} data.address - The address of the outlet.
 * @returns {Promise<Object>} The added outlet.
 */
export async function addOutlet(data: { name: string; address: string }) {
  const code = nanoid();
  const outlet = await setDoc({
    collection: "outlets",
    doc: {
      key: code,
      data: {
        code,
        ...data
      }
    }
  });
  return outlet;
}

/**
 * Retrieves an outlet by its code.
 * @param {string} code - The code of the outlet.
 * @returns {Promise<Object>} The retrieved outlet.
 */
export async function getOutlet(code: string) {
  const outlet = await getDoc({
    collection: "outlets",
    key: code
  });
  return outlet;
}

export async function listOutlets() {
  const outlets = await listDocs({
    collection: "outlets"
  });
  return outlets;
}

export async function updateOutlet(
  code: string,
  data: {
    name: string;
    address: string;
  }
) {
  const outlet = await setDoc({
    collection: "outlets",
    doc: {
      key: code,
      data
    }
  });
  return outlet;
}

export async function deleteOutlet(code: string) {
  const outlet = await setDoc({
    collection: "outlets",
    doc: {
      key: code,
      data: null
    }
  });
  return outlet;
}

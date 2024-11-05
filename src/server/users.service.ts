import { getDoc, setDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";

export interface IUser {
  code: string,
  name: string,
  age: number,
  address: string,
  email: string,
  NIK: string
}

export const setIdentityAsUser = async (data: { identity: string }) => {
  try {
    const record = {
      identity: data.identity,
      code: nanoid(),
      name: null,
      age: null,
      address: null,
      email: null,
      NIK: null
    };

    const doc = await setDoc({
      collection: "users",
      doc: {
        key: record.identity,
        data: record
      }
    });

    return doc;
  } catch (error) {
    console.error(new Date().toISOString(), "- setIdentityAsUser:", error);
    throw error;
  }
};

export async function getDetailUser(key: string) {
  if (!key) {
    throw new Error("Key is required");
  }
  const user = await getDoc({
    collection: "users",
    key
  });
  return user;
}

export async function updateProfile(key: string, version: bigint, data: any) {
  if (!key) {
    throw new Error("Key is required");
  }
  if (!version) {
    throw new Error("Version is required");
  }
  if (!data) {
    throw new Error("Data is required");
  }
  const user = await setDoc({
    collection: "users",
    doc: {
      key,
      version,
      data
    }
  });
  return user;
}

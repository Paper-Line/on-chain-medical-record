import { getDoc, setDoc } from "@junobuild/core-peer";

export interface IUser {
  code: string,
  name: string,
  age: number,
  address: string,
  email: string,
  NIK: string
}

export async function getDetailUser(key: string) {
  const user = await getDoc({
    collection: "users",
    key
  });
  return user;
}

export async function updateProfile(key: string, version: bigint, data: any) {
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

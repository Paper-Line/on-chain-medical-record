import { getDoc, setDoc } from "@junobuild/core-peer";

export interface IUser {
  code: string;
  name: string;
  age: number;
  address: string;
  email: string;
  NIK: string;
}

/**
 * Adds a new user to the datastore. After user login to the system, need to set the user identity.
 * @param {string} key - The key of the user.
 * @param {Object} data - The data for the new user.
 * @returns {Promise<Object>} - The added user.
 */
export const setIdentityAsUser = async (key: string, data?: Omit<IUser, "code">) => {
  try {
    const record = {
      code: key,
      name: data?.name || "",
      age: data?.age || 0,
      address: data?.address || "",
      email: data?.email || "",
      NIK: data?.NIK || ""
    };

    const doc = await setDoc({
      collection: "users",
      doc: {
        key,
        data: record
      }
    });

    return {
      data: doc.data as IUser,
      key: doc.key,
      owner: doc.owner,
      version: doc.version,
      created_at: doc.created_at,
      updated_at: doc.updated_at
    };
  } catch (error) {
    console.error(new Date().toISOString(), "- setIdentityAsUser:", error);
    throw error;
  }
};

/**
 * Gets the user detail.
 * @param {string} key - The key of the user.
 * @returns {Promise<Object>} - The user record.
 */
export async function getDetailUser(key: string) {
  const userDoc = await getDoc({
    collection: "users",
    key
  });
  if (!userDoc) return null;

  return {
    data: userDoc.data as IUser,
    key: userDoc.key,
    owner: userDoc.owner,
    version: userDoc.version,
    created_at: userDoc.created_at,
    updated_at: userDoc.updated_at
  };
}

/**
 * Updates the user profile.
 * @param {string} key - The key of the user.
 * @param {bigint} version - The version of the user.
 * @param {Object} data - The data to update.
 * @returns {Promise<Object>} - The updated user.
 */
export async function updateProfile(key: string, version: bigint, data: Omit<IUser, "code">) {
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

  return {
    data: user.data as IUser,
    key: user.key,
    owner: user.owner,
    version: user.version,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
}

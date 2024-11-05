import { getDoc } from "@junobuild/core-peer";

async function getDetailUserAsUser (identity: string) {
  try {
    const doc = await getDoc({
      collection: "users",
      key: identity
    });

    return doc;
  } catch (error) {
    console.error(new Date().toISOString(), "- getDetailUserAsUser:", error);
    throw error;
  }
}

export {
  getDetailUserAsUser
};
import { getDetailUserAsUser, setIdentityAsUser } from "@/server/features/users/users.service";

async function setIdentity (data: { identity: string }) {
  try {
    const user = await setIdentityAsUser(data);
    if (!user) {
      return undefined;
    }

    return user;
  } catch (error) {
    console.error(new Date().toISOString(), "- setIdentity:", error);
    return undefined;
  }
}

async function getDetailUser (identity: string) {
  try {
    const user = await getDetailUserAsUser(identity);
    if (!user) {
      return undefined;
    }

    return user;
  } catch (error) {
    console.error(new Date().toISOString(), "- getDetailUser:", error);
    return undefined;
  }
}

export {
  getDetailUser,
  setIdentity
};
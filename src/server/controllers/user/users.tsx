import { getDetailUser, setIdentityAsUser } from "@/server/users.service";

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

async function getDetailUserController (identity: string) {
  try {
    const user = await getDetailUser(identity);
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
  getDetailUserController,
  setIdentity
};
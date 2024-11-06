import { listDocs, setDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";

interface UserMedicalHistories {
  code: string
  userCode: string
  medicalHistoryCode: string
}

async function addUserMedicalHistory (data: {
  userCode: string
  medicalHistoryCode: string
}) {
  try {
    const record: UserMedicalHistories = {
      code: nanoid(),
      ...data
    };
    const key = nanoid();
  
    const doc = await setDoc({
      collection: "userMedicalHistories",
      doc: {
        key,
        data: record
      }
    });
  
    return doc;
  } catch (error) {
    throw error;
  }
}

async function getMedicalHistoriesByUserCode(data: { userCode: string }) {
  try {
    const userMedicalHistories = await listDocs({
      collection: "userMedicalHistories",
      filter: {
        owner: data.userCode
      }
    });
    if (!userMedicalHistories) {
      return undefined;
    }
  
    return userMedicalHistories.items as unknown as UserMedicalHistories[];
  } catch (error) {
    throw error;
  }
  
}

export {
  addUserMedicalHistory,
  getMedicalHistoriesByUserCode
};

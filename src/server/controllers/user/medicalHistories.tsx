import { addMedicalHistoryAsUser, getMedicalHistoryByCode } from "../../features/medicalHistories/medicalHistories.service";
import { addUserMedicalHistory, getMedicalHistoriesByUserCode } from "../../features/userMedicalHistories/userMedicalHistories.service";

interface IMedicalHistory {
  userCode: string
  diseaseComplaints: string[]
  diagnosis: string[]
  treatmentDescription: string[]
  medicalPrescribed: string[]
  cost: number
  place: string
}

async function addMedicalHistory (data: IMedicalHistory) {
  try {
    const medicalHistory = await addMedicalHistoryAsUser(data);
    if (!medicalHistory) {
      return undefined;
    }
  
    const userMedicalHistory = await addUserMedicalHistory({
      userCode: data.userCode,
      medicalHistoryCode: medicalHistory.code
    });
    if (!userMedicalHistory) {
      return undefined;
    }
  
    return userMedicalHistory;
  } catch (error) {
    console.error(new Date().toISOString(), "- addMedicalHistory:", error);
    return undefined;
  }
}

async function getUserMedicalHistories (data: { userCode: string }) {
  try {
    const userMedicalHistories = await getMedicalHistoriesByUserCode(data);
    if (!userMedicalHistories) {
      return undefined;
    }
    
    const medicalHistories = await Promise.all(userMedicalHistories.map(async (data) => {
      const code = data.medicalHistoryCode;
      const medicalHistory = await getMedicalHistoryByCode({ code });
      return medicalHistory;
    }));

    return medicalHistories.filter((item) => item !== undefined);
  } catch (error) {
    console.error(new Date().toISOString(), "- getUserMedicalHistories:", error);
    return undefined;
  }
}

export {
  addMedicalHistory,
  getUserMedicalHistories
};

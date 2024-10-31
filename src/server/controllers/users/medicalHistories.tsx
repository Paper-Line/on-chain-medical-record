import { addMedicalHistoryAsUser } from '../../features/medicalHistories/medicalHistories.service'
import { addUserMedicalHistory } from '../../features/userMedicalHistories/userMedicalHistories.service'

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
    const medicalHistory = await addMedicalHistoryAsUser(data)
    if (!medicalHistory) {
      return undefined
    }
  
    const userMedicalHistory = await addUserMedicalHistory({
      userCode: data.userCode,
      medicalHistoryCode: medicalHistory.data.code
    })
    if (!userMedicalHistory) {
      return undefined
    }
  
    return userMedicalHistory
  } catch (error) {
    console.error(new Date().toISOString(), '- addMedicalHistory:', error)
    return undefined
  }
}

export {
  addMedicalHistory
}

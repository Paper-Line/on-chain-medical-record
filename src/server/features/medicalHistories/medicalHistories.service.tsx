import { setDoc } from '@junobuild/core-peer'
import { nanoid } from 'nanoid'

interface MedicalHistory {
  code: string
  outletId: string | null
  diseaseComplaints: string[]
  diagnosis: string[]
  treatmentDescription: string[]
  medicalPrescribed: string[]
  cost: number
  place: string
}

async function addMedicalHistoryAsUser (data: {
  diseaseComplaints: string[]
  diagnosis: string[]
  treatmentDescription: string[]
  medicalPrescribed: string[]
  cost: number
  place: string
}) {
  try {
    const record: MedicalHistory = {
      code: nanoid(),
      outletId: null,
      ...data
    }
    const key = nanoid()
  
    const doc = await setDoc({
      collection: 'medicalHistories',
      doc: {
        key,
        data: record
      }
    })
  
    return doc
  } catch (error) {
    console.error(new Date().toISOString(), '- addMedicalHistoryAsUser:', error)
    throw error
  }
}

export {
  addMedicalHistoryAsUser
}

import { setDoc } from '@junobuild/core-peer'
import { nanoid } from 'nanoid'

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
    }
    const key = nanoid()
  
    const doc = await setDoc({
      collection: 'userMedicalHistories',
      doc: {
        key,
        data: record
      }
    })
  
    return doc
  } catch (error) {
    console.error(new Date().toISOString(), '- addUserMedicalHistory:', error)
    throw error
  }
}

export {
  addUserMedicalHistory
}

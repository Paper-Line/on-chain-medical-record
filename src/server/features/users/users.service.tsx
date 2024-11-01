import { setDoc, listDocs } from '@junobuild/core-peer'
import { nanoid } from 'nanoid'

async function setIdentityAsUser (data: { identity: string }) {
  try {
    const record = {
      identity: data.identity,
      code: nanoid()
    }
    const key = nanoid()

    const doc = await setDoc({
      collection: 'users',
      doc: {
        key,
        data: record
      }
    })

    return doc
  } catch (error) {
    console.error(new Date().toISOString(), '- setIdentityAsUser:', error)
    throw error
  }
}

async function getDetailUserAsUser (identity: string) {
  try {
    const doc = await listDocs({
      collection: 'users',
      filter: {
        matcher: {
          key: identity
        }
      }
    })

    return doc
  } catch (error) {
    console.error(new Date().toISOString(), '- getDetailUserAsUser:', error)
    throw error
  }
}

export {
  getDetailUserAsUser,
  setIdentityAsUser
}
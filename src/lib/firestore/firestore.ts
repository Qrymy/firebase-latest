import { createRef, createQuery, createBatch, createClientRef } from './helpers'
import { chunkArray } from '@/utils/chunkArray'
import {
  Snapshot,
  Firestore,
  DocumentPath,
  CollectionPath,
  FirestoreQuery,
} from '@/types/Firestore'
import { AnyRecord } from '@/types/AnyRecord'

const getUnix = () => {
  return Date.now()
}

export const setDocument = async <T extends AnyRecord>(
  paths: DocumentPath | CollectionPath,
  payload: Partial<T>,
  firestore?: Firestore
) => {
  const ref = createRef(paths, firestore)
  const createdAt = getUnix()
  payload = {
    ...payload,
    id: ref.id,
    createdAt,
    updatedAt: createdAt,
  }
  await ref.set(payload)

  return payload
}

export const batchSetDocuments = async <T extends AnyRecord>(
  path: CollectionPath,
  payloads: Partial<T>[]
) => {
  /**
   * @see https://firebase.google.com/docs/firestore/manage-data/transactions?hl=ja
   */
  const chunked = chunkArray(payloads, 500)

  const promises = chunked.map((todos) => {
    const batch = createBatch()

    todos.forEach((todo) => {
      const ref = createClientRef(path)

      batch.set(ref, todo)
    })

    return batch.commit()
  })

  return Promise.all(promises)
}

export const updateDocument = <T extends AnyRecord>(
  paths: DocumentPath,
  payload: Partial<T>,
  firestore?: Firestore
) => {
  const ref = createRef(paths, firestore)
  const updatedAt = getUnix()
  payload = {
    ...payload,
    updatedAt,
  }

  return ref.update(payload)
}

export const deleteDocument = (path: DocumentPath) => {
  const ref = createRef(path)

  return ref.delete()
}

export const getDocument = async <T extends AnyRecord>(
  paths: DocumentPath,
  firestore?: Firestore
): Promise<T | null> => {
  const ref = createRef(paths, firestore)
  const doc = await ref.get()

  return doc.exists ? (doc.data() as T) : null
}

export const listDocuments = async <T extends AnyRecord>(
  paths: CollectionPath,
  query: FirestoreQuery<T> = {},
  firestore?: Firestore
): Promise<T[]> => {
  const ref = createQuery(paths, query, firestore)
  const { docs } = await ref.get()

  return (docs as Snapshot[]).map((doc) => doc.data() as T)
}

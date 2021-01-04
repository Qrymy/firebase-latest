import { createRef, createQuery } from './helpers'
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

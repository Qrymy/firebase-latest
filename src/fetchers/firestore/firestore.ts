import { firestore } from '@/lib/firebase'
import { GetParam, DocumentPath, CollectionPath } from '@/types/Firestore'
import { AnyRecord } from '@/types/AnyRecord'
import { createQuery, createUniqueKey, createRef } from './helpers'

export const createCollectionFetcher = <T extends AnyRecord>(
  ...[path, query]: GetParam<T, 'collection'>
) => {
  const generatedPath = createUniqueKey(path, query)
  const ref = createQuery(path, query)

  const fetcher = async (_?: string) => {
    const { docs } = await ref.get()

    return docs.map((doc) => doc.data() as T)
  }

  return [generatedPath, fetcher] as const
}

export const createDocumentFetcher = <T extends AnyRecord>(
  ...[path]: GetParam<T, 'document'>
) => {
  const fetcher = async (_?: string) => {
    const doc = await firestore.doc(path.slice(1)).get()

    return doc.exists ? (doc.data() as T) : null
  }

  return [path, fetcher] as const
}

export const createSetFetcher = <T extends AnyRecord>(
  path: DocumentPath | CollectionPath
) => {
  const fetcher = (payload: Partial<T>) => {
    const ref = createRef(path)

    payload = {
      ...payload,
      id: ref.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    return ref.set(payload)
  }

  return fetcher
}

import { firestore } from '@/lib/firebase'
import { FirestoreParam } from '@/types/Firestore'
import { AnyRecord } from '@/types/AnyRecord'
import { createQuery, createUniqueKey } from './helpers'

export const createCollectionFetcher = <T extends AnyRecord>(
  ...[path, query]: FirestoreParam<T, 'collection'>
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
  ...[path]: FirestoreParam<T, 'document'>
) => {
  const fetcher = async (_?: string) => {
    const doc = await firestore.doc(path.slice(1)).get()

    return doc.exists ? (doc.data() as T) : null
  }

  return [path, fetcher] as const
}

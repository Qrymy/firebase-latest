import { CollectionPath, DocumentPath, Query } from '@/types/Firestore'
import { AnyRecord } from '@/types/AnyRecord'

export type Fetcher<T extends AnyRecord> =
  | ((path: DocumentPath) => Promise<T | null>)
  | ((path: CollectionPath, query?: Query<T>) => Promise<T[]>)

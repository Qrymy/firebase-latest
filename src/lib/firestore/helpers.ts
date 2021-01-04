import { firestore } from '@/lib/firebase'
import {
  Firestore,
  DocumentPath,
  CollectionRef,
  CollectionPath,
  FirestoreQuery,
} from '@/types/Firestore'
import { AnyRecord } from '@/types/AnyRecord'

export const createQuery = <T extends AnyRecord>(
  paths: CollectionPath,
  query?: FirestoreQuery<T>,
  app: Firestore = firestore
) => {
  let ref: CollectionRef = app.collection(paths[0])

  if (!query || Object.keys(query).length === 0) {
    return ref
  }

  const {
    where = [],
    orderBy = [],
    limit,
    limitToLast,
    startAt,
    startAfter,
    endBefore,
    endAt,
  } = query

  ref = where.reduce((acc, item) => {
    acc = acc.where(...item)

    return acc
  }, ref)

  ref = orderBy.reduce((acc, item) => {
    acc = acc.orderBy(...item)

    return acc
  }, ref)

  if (typeof limit === 'number') {
    ref = ref.limit(limit)
  }

  if (typeof limitToLast === 'number') {
    ref = ref.limitToLast(limitToLast)
  }

  if (typeof startAt !== 'undefined') {
    ref = ref.startAt(startAt)
  }

  if (typeof startAfter !== 'undefined') {
    ref = ref.startAfter(startAfter)
  }

  if (typeof endBefore !== 'undefined') {
    ref = ref.endBefore(endAt)
  }

  if (typeof endAt !== 'undefined') {
    ref = ref.endAt(endAt)
  }

  return ref
}

export const createRef = (
  paths: DocumentPath | CollectionPath,
  app: Firestore = firestore
) => {
  if (paths.length === 2) {
    return app.doc(paths.join('/'))
  }

  return app.collection(paths[0]).doc()
}

import firebase from 'firebase/app'
import { firestore } from '@/lib/firebase'
import { FirestoreParam } from '@/types/Firestore'
import { AnyRecord } from '@/types/AnyRecord'

type CollectionRef =
  | firebase.firestore.CollectionReference
  | firebase.firestore.Query

export const createQuery = <
  T extends AnyRecord,
  M extends 'collection' | 'document'
>(
  ...[path, query]: FirestoreParam<T, M>
) => {
  let ref: CollectionRef = firestore.collection(path.slice(1))

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

export const createUniqueKey = <
  T extends AnyRecord,
  M extends 'document' | 'collection'
>(
  ...[path, query]: FirestoreParam<T, M>
) => {
  if (!query || Object.keys(query).length === 0) {
    return path
  }

  const {
    where,
    orderBy,
    limit,
    limitToLast,
    startAt,
    startAfter,
    endBefore,
    endAt,
  } = query

  const packed = [
    where,
    orderBy,
    limit,
    limitToLast,
    startAt,
    startAfter,
    endBefore,
    endAt,
  ].flatMap((item) => (typeof item !== 'undefined' ? [item] : []))

  return packed.reduce<string>((acc, value) => {
    if (typeof value === 'number') {
      acc = acc + value
    } else {
      acc = acc + JSON.stringify(value)
    }

    return acc
  }, path)
}

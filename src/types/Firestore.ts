import firebase from 'firebase/app'
import { AnyRecord } from '@/types/AnyRecord'

type ComparisonOperator = firebase.firestore.WhereFilterOp

type OrderByDirection = firebase.firestore.OrderByDirection

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot

const collections = {
  todos: 'todos',
} as const

type Collection = keyof typeof collections

type CollectionPath = `/${Collection}`

type DocumentPath = string

type Where<T extends AnyRecord> = [
  Extract<keyof T, string>,
  ComparisonOperator,
  Extract<T[keyof T], string | number | boolean | null | bigint>
]

type Order<T extends AnyRecord> = [Extract<keyof T, string>, OrderByDirection?]

export type FirestoreQuery<T extends AnyRecord> = {
  readonly where?: Where<T>[]
  readonly orderBy?: Order<T>[]
  readonly limit?: number
  readonly limitToLast?: number
  readonly startAt?: DocumentSnapshot | T[keyof T][]
  readonly startAfter?: DocumentSnapshot | T[keyof T][]
  readonly endBefore?: DocumentSnapshot | T[keyof T][]
  readonly endAt?: DocumentSnapshot | T[keyof T][]
}

export type FirestoreParam<
  T extends AnyRecord,
  M extends 'document' | 'collection'
> = M extends 'document'
  ? [DocumentPath]
  : M extends 'collection'
  ? [CollectionPath, FirestoreQuery<T>?]
  : never

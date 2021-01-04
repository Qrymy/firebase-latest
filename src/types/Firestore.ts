import firebase from 'firebase/app'
import { AnyRecord } from '@/types/AnyRecord'

const COLLECTION = {
  todos: 'todos',
} as const

/**
 * @HACK
 * HACK type suggestions.
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
type StringHack = string & {}

export type Firestore =
  | FirebaseFirestore.Firestore
  | firebase.firestore.Firestore

export type CollectionRef =
  | FirebaseFirestore.CollectionReference
  | FirebaseFirestore.Query
  | firebase.firestore.CollectionReference
  | firebase.firestore.Query

export type Snapshot =
  | FirebaseFirestore.QueryDocumentSnapshot
  | firebase.firestore.QueryDocumentSnapshot

type ComparisonOperator = firebase.firestore.WhereFilterOp

type OrderByDirection = firebase.firestore.OrderByDirection

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot

type Collection = typeof COLLECTION[keyof typeof COLLECTION]

export type CollectionPath = [Collection]

export type DocumentPath = [Collection, string]

type Where<T extends AnyRecord> = [
  Extract<keyof T, string> | StringHack,
  ComparisonOperator,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  any
]

type Order<T extends AnyRecord> = [Extract<keyof T, string>, OrderByDirection?]

export type FirestoreQuery<T extends AnyRecord> = {
  readonly where?: Where<T>[]
  readonly orderBy?: Order<T>[]
  readonly limit?: number
  readonly limitToLast?: number
  readonly startAt?: DocumentSnapshot | T[keyof T][] | T[keyof T]
  readonly startAfter?: DocumentSnapshot | T[keyof T][] | T[keyof T]
  readonly endBefore?: DocumentSnapshot | T[keyof T][] | T[keyof T]
  readonly endAt?: DocumentSnapshot | T[keyof T][] | T[keyof T]
}

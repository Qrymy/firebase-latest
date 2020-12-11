import firebase from 'firebase/app'
import { AnyRecord } from '@/types/AnyRecord'

type DocumentSnapshot<T> = firebase.firestore.DocumentSnapshot<T>

type ComparisonOperator = firebase.firestore.WhereFilterOp

type OrderByDirection = firebase.firestore.OrderByDirection

const collections = {
  dump: 'dump',
  test: 'test',
} as const

type Collection = keyof typeof collections

export type CollectionPath = `/${Collection}`

export type DocumentPath = `${CollectionPath}/${string}`

type WhereQuery<T extends AnyRecord, K extends keyof T> = [
  K,
  ComparisonOperator,
  T[K]
]

type Order<T extends AnyRecord> = [keyof T, OrderByDirection]

type FieldValue<T extends AnyRecord, K extends keyof T> = T[K]

export type Query<T extends AnyRecord> = {
  readonly where?: WhereQuery<T, keyof T>[]
  readonly order?: Order<T>[]
  readonly limit?: number
  readonly limitToLast?: number
  readonly startAt?: DocumentSnapshot<T> | FieldValue<T, keyof T>[]
  readonly startAfter?: DocumentSnapshot<T> | FieldValue<T, keyof T>[]
  readonly endBefore?: DocumentSnapshot<T> | FieldValue<T, keyof T>[]
  readonly endAt?: DocumentSnapshot<T> | FieldValue<T, keyof T>[]
}

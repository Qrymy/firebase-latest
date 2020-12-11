import firebase from 'firebase/app'

export type BrowserError =
  | firebase.FirebaseError
  | firebase.auth.AuthError
  | firebase.auth.Error
  | firebase.storage.FirebaseStorageError
  | firebase.firestore.FirestoreError
  | Error

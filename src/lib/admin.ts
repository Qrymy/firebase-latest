import * as admin from 'firebase-admin'

const config: admin.AppOptions = {
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

if (admin.apps.length === 0) {
  admin.initializeApp(config)
}

export const auth = admin.auth()
export const firestore = admin.firestore()

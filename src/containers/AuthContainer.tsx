import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { firebase, auth } from '@/lib/firebase'

const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user === null) {
      auth.signInAnonymously()
    }
  }, [user])

  return { user }
}

export const AuthContainer = createContainer(useAuth)

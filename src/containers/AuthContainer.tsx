import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { auth } from '@/lib/firebase'

const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser)

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setIsInitialized(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return { user, isInitialized }
}

export const AuthContainer = createContainer(useAuth)

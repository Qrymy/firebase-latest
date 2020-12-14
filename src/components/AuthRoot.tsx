import { FC, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { AuthContainer } from '@/containers/AuthContainer'
import { useFetcher } from '@/hooks/useFetcher'

export const AuthRoot: FC = ({ children }) => {
  const { user, isInitialized } = AuthContainer.useContainer()

  const [, isLoading, signIn] = useFetcher(async () => auth.signInAnonymously())

  useEffect(() => {
    if (!user && isInitialized) {
      signIn()
    }
  }, [user, isInitialized])

  if (isLoading || !isInitialized || !user) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: 32 }}>{`uid: ${user.uid}`}</div>
      {children}
    </div>
  )
}

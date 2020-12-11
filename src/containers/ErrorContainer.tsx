import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { BrowserError } from '@/types/BrowserError'

const useError = () => {
  const [error, setError] = useState<BrowserError>()

  useEffect(() => {
    if (error) {
      console.error('from: ErrorContainer: ', error)
    }
  }, [error])

  const onError = (error: BrowserError) => {
    setError(error)
  }

  return { error, onError }
}

export const ErrorContainer = createContainer(useError)

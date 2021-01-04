import { Todo } from '@/types/Todo'
import { useState } from 'react'

export const useTodoListContainer = () => {
  const [isEnded, setIsEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cursor, setCursor] = useState<Todo['createdAt']>()
  const [cursors, setCursors] = useState<Todo['createdAt'][]>([])

  const increment = () => {
    if (cursor) {
      setCursors((prev) => [...prev, cursor])
    }
  }

  return {
    isEnded,
    isLoading,
    cursor,
    cursors,
    setIsEnded,
    setIsLoading,
    setCursor,
    increment,
  }
}

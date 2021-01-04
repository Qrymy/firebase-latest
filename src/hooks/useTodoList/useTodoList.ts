import useSWR from 'swr'
import { fetcher } from './fetchers'
import { Todo } from '@/types/Todo'

export const useTodoList = (
  uid?: string,
  cursorOrInitialData?: Todo['createdAt'] | Todo[]
) => {
  const cursor =
    typeof cursorOrInitialData === 'number' ? cursorOrInitialData : undefined

  const initialData = Array.isArray(cursorOrInitialData)
    ? cursorOrInitialData
    : undefined

  const key = uid && cursor ? `/todos/${cursor}` : uid ? '/todos' : null

  const { data } = useSWR(key, fetcher, { initialData })

  const loading = {
    initial: typeof data === 'undefined',
  }

  return {
    todos: data ?? [],
    loading,
  }
}

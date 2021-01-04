import useSWR from 'swr'
import { fetcher } from './fetchers'
import { Todo } from '@/types/Todo'

export const useTodoList = (uid?: string, initialData?: Todo[]) => {
  const key = uid ? '/todos' : null

  const { data } = useSWR(key, fetcher, { initialData })

  const loading = {
    initial: typeof data === 'undefined',
  }

  return {
    todos: data ?? [],
    loading,
  }
}

import useSWR from 'swr'
import { fetcher } from './fetchers'
import { Todo } from '@/types/Todo'

export const useTodo = (
  todoId: string,
  uid?: string,
  initialData?: Todo | null
) => {
  const key = uid ? `/todos/${todoId}` : null

  const { data } = useSWR(key, fetcher, { initialData })

  const loading = {
    initial: typeof data === 'string',
  } as const

  return {
    todo: data ?? null,
    loading,
  }
}

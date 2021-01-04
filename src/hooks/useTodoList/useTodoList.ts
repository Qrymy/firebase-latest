import { useMemo } from 'react'
import { useSWRInfinite } from 'swr'
import { fetcher } from './fetchers'
import { Todo } from '@/types/Todo'
import { LIMITATION } from '@/const/Limitation'

export const useTodoList = (uid?: string, initialData?: Todo[]) => {
  const getKey = (pageIndex: number, previousPageData: Todo[] | null) => {
    if (uid && pageIndex === 0) {
      return '/todos'
    }

    if (
      uid &&
      previousPageData &&
      previousPageData.length === LIMITATION.TODOS_LIST
    ) {
      const cursor = previousPageData[previousPageData.length - 1].createdAt

      return `/todos/${cursor}`
    }

    return null
  }

  const { data, setSize } = useSWRInfinite(getKey, fetcher, {
    initialData: initialData && [initialData],
    initialSize: LIMITATION.TODOS_LIST,
  })

  const isEnded = useMemo(() => {
    if (data && data.length > 0) {
      return data[data.length - 1].length < LIMITATION.TODOS_LIST
    }

    return false
  }, [data])

  const increment = () => {
    return setSize((size) => size + 1)
  }

  const loading = {
    initial: typeof data === 'undefined',
    more:
      data && data.length > 0 && typeof data[data.length - 1] === 'undefined',
  }

  return {
    todos: data ? data.flat() : [],
    increment,
    isEnded,
    loading,
  }
}

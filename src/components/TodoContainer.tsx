import { FC, useMemo } from 'react'
import useSWR from 'swr'
import { createDocumentFetcher } from '@/fetchers/firestore'
import { Todo } from '@/types/Todo'

type Props = {
  readonly todoId: string
  readonly initialData?: Todo | null
}

export const TodoContainer: FC<Props> = ({ todoId, initialData }) => {
  const [key, fetcher] = useMemo(() => {
    return createDocumentFetcher(`/todos/${todoId}`)
  }, [todoId])

  const { data } = useSWR(key, fetcher, { initialData })

  if (typeof data === 'undefined') {
    return <div>Loading...</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

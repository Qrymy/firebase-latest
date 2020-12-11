import { FC, useMemo } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { createCollectionFetcher } from '@/fetchers/firestore'
import { Todo } from '@/types/Todo'

type Props = {
  readonly initialData?: Todo[]
}

export const TodoListContainer: FC<Props> = ({ initialData }) => {
  const [key, fetcher] = useMemo(() => {
    return createCollectionFetcher<Todo>('/todos', {
      orderBy: [['createdAt', 'desc']],
    })
  }, [])

  const { data } = useSWR(key, fetcher, { initialData })

  if (typeof data === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data.map(({ id, content }) => (
        <Link href={`/${id}`} key={id} passHref>
          <a style={{ display: 'block', marginTop: 12 }}>{content}</a>
        </Link>
      ))}
    </div>
  )
}

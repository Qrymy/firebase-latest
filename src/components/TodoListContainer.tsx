import { FC, useCallback } from 'react'
import Link from 'next/link'
import { AuthContainer } from '@/containers/AuthContainer'
import { useTodoList } from '@/hooks/useTodoList'
import { Todo } from '@/types/Todo'

type Props = {
  readonly initialData?: Todo[]
}

export const TodoListContainer: FC<Props> = ({ initialData }) => {
  const { user } = AuthContainer.useContainer()

  const { todos, isEnded, increment, loading } = useTodoList(
    user?.uid,
    initialData
  )

  const handleClick = useCallback(() => {
    increment()
  }, [increment])

  return (
    <div>
      <Link href="/create" passHref>
        <a
          style={{
            display: 'block',
            color: 'green',
            fontSize: 24,
          }}
        >
          Create
        </a>
      </Link>
      {todos.map(({ id, content }) => (
        <Link href={`/${id}`} key={id} passHref>
          <a style={{ display: 'block', marginTop: 12 }}>{content}</a>
        </Link>
      ))}
      <button disabled={isEnded} onClick={handleClick}>
        {loading.more ? 'fetching...' : 'Load more'}
      </button>
    </div>
  )
}

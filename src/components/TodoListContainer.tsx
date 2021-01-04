import { FC } from 'react'
import Link from 'next/link'
import { AuthContainer } from '@/containers/AuthContainer'
import { useTodoList } from '@/hooks/useTodoList'
import { Todo } from '@/types/Todo'

type Props = {
  readonly initialData?: Todo[]
}

export const TodoListContainer: FC<Props> = ({ initialData }) => {
  const { user } = AuthContainer.useContainer()

  const { todos, loading } = useTodoList(user?.uid, initialData)

  if (loading.initial) {
    return <div>Loading...</div>
  }

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
    </div>
  )
}

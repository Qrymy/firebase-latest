import { FC } from 'react'
import { AuthContainer } from '@/containers/AuthContainer'
import { useTodo } from '@/hooks/useTodo'
import { Todo } from '@/types/Todo'

type Props = {
  readonly todoId: string
  readonly initialData?: Todo | null
}

export const TodoContainer: FC<Props> = ({ todoId, initialData }) => {
  const { user } = AuthContainer.useContainer()

  const { todo, loading } = useTodo(todoId, user?.uid, initialData)

  if (loading.initial) {
    return <div>Loading...</div>
  }

  return <div>{JSON.stringify(todo)}</div>
}

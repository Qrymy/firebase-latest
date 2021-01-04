import { getDocument } from '@/lib/firestore'
import { Todo } from '@/types/Todo'

export const fetcher = async (key: string) => {
  const [, , todoId] = key.split('/')
  const todo = await getDocument<Todo>(['todos', todoId])

  return todo
}

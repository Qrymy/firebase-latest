import { listDocuments } from '@/lib/firestore'
import { Todo } from '@/types/Todo'

export const fetcher = async (_key: string) => {
  const todos = await listDocuments<Todo>(['todos'], {
    orderBy: [['createdAt', 'desc']],
  })

  return todos
}

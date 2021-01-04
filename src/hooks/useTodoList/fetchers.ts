import { listDocuments } from '@/lib/firestore'
import { Todo } from '@/types/Todo'
import { LIMITATION } from '@/const/Limitation'

export const fetcher = async (_key: string) => {
  const todos = await listDocuments<Todo>(['todos'], {
    orderBy: [['createdAt', 'desc']],
    limit: LIMITATION.TODOS_LIST,
  })

  return todos
}

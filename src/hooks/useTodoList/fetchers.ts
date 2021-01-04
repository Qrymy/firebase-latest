import { listDocuments } from '@/lib/firestore'
import { Todo } from '@/types/Todo'
import { LIMITATION } from '@/const/Limitation'

export const fetcher = async (key: string) => {
  const [, , cursor] = key.split('/')

  const todos = await listDocuments<Todo>(['todos'], {
    orderBy: [['createdAt', 'desc']],
    limit: LIMITATION.TODOS_LIST,
    ...(cursor ? { startAfter: parseInt(cursor, 10) } : {}),
  })

  return todos
}

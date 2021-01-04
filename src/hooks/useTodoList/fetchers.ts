import { listDocuments, getSnapshot } from '@/lib/firestore'
import { Todo } from '@/types/Todo'
import { LIMITATION } from '@/const/Limitation'

export const fetcher = async (key: string) => {
  const [, , cursor] = key.split('/')

  const snapshot = cursor ? await getSnapshot(['todos', cursor]) : undefined

  const todos = await listDocuments<Todo>(['todos'], {
    orderBy: [['createdAt', 'desc']],
    limit: LIMITATION.TODOS_LIST,
    ...(snapshot ? { startAfter: snapshot } : {}),
  })

  return todos
}

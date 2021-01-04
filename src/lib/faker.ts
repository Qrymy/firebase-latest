import faker from 'faker/locale/ja'
import { Todo } from '@/types/Todo'

export const createFakerTodos = (count = 1000, words = 2): Partial<Todo>[] => {
  return Array.from({ length: count }).map(() => {
    return { content: faker.lorem.words(words) }
  })
}

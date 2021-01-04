import faker from 'faker/locale/ja'

export const createFakerTodos = (count = 1000, words = 2) => {
  return Array.from({ length: count }).map(() => {
    return faker.lorem.words(words)
  })
}

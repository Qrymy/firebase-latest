import { ComponentProps } from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { TodoContainer } from '@/components/TodoContainer'
import {
  createDocumentFetcher,
  createCollectionFetcher,
} from '@/fetchers/admin'
import { Todo } from '@/types/Todo'

type Props = ComponentProps<typeof TodoContainer>

export const getStaticPaths: GetStaticPaths = async () => {
  const [, fetcher] = createCollectionFetcher<Todo>('/todos')
  const todos = await fetcher()
  const paths = todos.map(({ id }) => `/${id}`)

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const todoId = params?.todoId as string
  const [, fetcher] = createDocumentFetcher<Todo>(`/todos/${todoId}`)
  const initialData = await fetcher()

  return { props: { todoId, initialData } }
}

const TodoPage: NextPage<Props> = ({ todoId, initialData }) => (
  <TodoContainer initialData={initialData} todoId={todoId} />
)

export default TodoPage

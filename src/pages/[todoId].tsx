import { ComponentProps } from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { firestore } from '@/lib/admin'
import { listDocuments, getDocument } from '@/lib/firestore'
import { TodoContainer } from '@/components/TodoContainer'
import { Todo } from '@/types/Todo'

type Props = ComponentProps<typeof TodoContainer>

export const getStaticPaths: GetStaticPaths = async () => {
  const todos = await listDocuments<Todo>(['todos'], {}, firestore)
  const paths = todos.map(({ id }) => `/${id}`)

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const todoId = params?.todoId as string
  const initialData = await getDocument<Todo>(['todos', todoId], firestore)

  return { props: { todoId, initialData } }
}

const TodoPage: NextPage<Props> = ({ todoId, initialData }) => (
  <TodoContainer initialData={initialData} todoId={todoId} />
)

export default TodoPage

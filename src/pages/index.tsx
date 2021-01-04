import { ComponentProps } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { firestore } from '@/lib/admin'
import { listDocuments } from '@/lib/firestore'
import { TodoListContainer } from '@/components/TodoListContainer'
import { Todo } from '@/types/Todo'

type Props = ComponentProps<typeof TodoListContainer>

export const getStaticProps: GetStaticProps<Props> = async () => {
  const initialData = await listDocuments<Todo>(
    ['todos'],
    {
      orderBy: [['createdAt', 'desc']],
    },
    firestore
  )

  return { props: { initialData } }
}

const TodoListPage: NextPage<Props> = ({ initialData }) => (
  <TodoListContainer initialData={initialData} />
)

export default TodoListPage

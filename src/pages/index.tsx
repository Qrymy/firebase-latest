import { ComponentProps } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { TodoListContainer } from '@/components/TodoListContainer'
import { createCollectionFetcher } from '@/fetchers/admin'
import { Todo } from '@/types/Todo'

type Props = ComponentProps<typeof TodoListContainer>

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [, fetcher] = createCollectionFetcher<Todo>('/todos', {
    orderBy: [['createdAt', 'desc']],
  })
  const initialData = await fetcher()

  return { props: { initialData } }
}

const TodoListPage: NextPage<Props> = ({ initialData }) => (
  <TodoListContainer initialData={initialData} />
)

export default TodoListPage

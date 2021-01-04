import { FC, Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useTodoList } from '@/hooks/useTodoList'
import { Todo } from '@/types/Todo'
import { LIMITATION } from '@/const/Limitation'

type Props = {
  readonly uid?: string
  readonly cursorOrInitialData?: number | Todo[]
  readonly isLast: boolean
  readonly onChangeIsEnded?: (isEnded: boolean) => void
  readonly onChangeCursor?: (cursor: Todo['createdAt']) => void
  readonly onChangeIsLoading?: (isLoading: boolean) => void
}

export const TodoList: FC<Props> = ({
  uid,
  cursorOrInitialData,
  isLast,
  onChangeIsEnded,
  onChangeCursor,
  onChangeIsLoading,
}) => {
  const { todos, loading } = useTodoList(uid, cursorOrInitialData)

  useEffect(() => {
    if (isLast && todos) {
      if (onChangeIsEnded) {
        onChangeIsEnded(todos.length < LIMITATION.TODOS_LIST)
      }

      if (onChangeCursor && todos.length === LIMITATION.TODOS_LIST) {
        onChangeCursor(todos[todos.length - 1].createdAt)
      }
    }
  }, [isLast, todos, onChangeIsEnded, onChangeCursor])

  useEffect(() => {
    if (onChangeIsLoading) {
      onChangeIsLoading(loading.initial)
    }
  }, [loading.initial, onChangeIsLoading])

  return (
    <Fragment>
      {todos.map(({ id, content }) => (
        <Link href={`/${id}`} key={id} passHref>
          <a style={{ display: 'block', marginTop: 12 }}>{content}</a>
        </Link>
      ))}
    </Fragment>
  )
}

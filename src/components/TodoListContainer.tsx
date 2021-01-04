import { FC, useCallback } from 'react'
import Link from 'next/link'
import { AuthContainer } from '@/containers/AuthContainer'
import { useTodoListContainer } from '@/hooks/useTodoListContainer'
import { TodoList } from '@/components/TodoList'
import { Todo } from '@/types/Todo'

type Props = {
  readonly initialData?: Todo[]
}

export const TodoListContainer: FC<Props> = ({ initialData }) => {
  const { user } = AuthContainer.useContainer()

  const {
    isEnded,
    isLoading,
    cursors,
    setIsEnded,
    setIsLoading,
    setCursor,
    increment,
  } = useTodoListContainer()

  const handleClick = useCallback(() => {
    increment()
  }, [increment])

  return (
    <div>
      <Link href="/create" passHref>
        <a
          style={{
            display: 'block',
            color: 'green',
            fontSize: 24,
          }}
        >
          Create
        </a>
      </Link>
      <TodoList
        cursorOrInitialData={initialData}
        isLast={cursors.length === 0}
        onChangeCursor={setCursor}
        onChangeIsEnded={setIsEnded}
        onChangeIsLoading={setIsLoading}
        uid={user?.uid}
      />
      {cursors.map((cursor, index) => (
        <TodoList
          cursorOrInitialData={initialData}
          isLast={cursors[cursors.length - 1] === index}
          key={cursor}
          onChangeCursor={setCursor}
          onChangeIsEnded={setIsEnded}
          onChangeIsLoading={setIsLoading}
          uid={user?.uid}
        />
      ))}
      <button disabled={isEnded} onClick={handleClick}>
        {isLoading ? 'fetching...' : 'Load more'}
      </button>
    </div>
  )
}

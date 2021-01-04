import { FC, useState, useCallback, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { setDocument } from '@/lib/firestore'
import { useFetcher } from '@/hooks/useFetcher'
import { Todo } from '@/types/Todo'

export const CreateTodoContainer: FC = () => {
  const [value, setValue] = useState('')

  const { replace } = useRouter()

  const [, isLoading, create] = useFetcher(async (payload: Partial<Todo>) => {
    return setDocument<Todo>(['todos'], payload)
  })

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value)
    },
    [setValue]
  )

  const handleClick = useCallback(async () => {
    await create({ content: value })
    setValue('')
    replace('/')
  }, [value, create])

  return (
    <div>
      <input onChange={handleChange} placeholder="Enter todo..." />
      <button disabled={isLoading} onClick={handleClick}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}

import { FC, useMemo, useState, useCallback, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useFetcher } from '@/hooks/useFetcher'
import { createSetFetcher } from '@/fetchers/firestore'
import { Todo } from '@/types/Todo'

export const CreateTodoContainer: FC = () => {
  const [value, setValue] = useState('')

  const { replace } = useRouter()

  const fetcher = useMemo(() => {
    return createSetFetcher<Todo>('/todos')
  }, [])

  const [, isLoading, create] = useFetcher(fetcher)

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

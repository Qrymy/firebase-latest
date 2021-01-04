import { VFC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { batchSetDocuments } from '@/lib/firestore'
import { createFakerTodos } from '@/lib/faker'
import { useFetcher } from '@/hooks/useFetcher'

export const CreateDummyDataContainer: VFC = () => {
  const { replace } = useRouter()

  const [, isLoading, create] = useFetcher(async () => {
    const todos = createFakerTodos()

    return batchSetDocuments(['todos'], todos)
  })

  const handleClick = useCallback(async () => {
    await create()
    replace('/')
  }, [create])

  return (
    <div>
      <button onClick={handleClick}>
        {isLoading ? 'Submitting...' : 'Create dummy data'}
      </button>
    </div>
  )
}

import { useState } from 'react'
import { ErrorContainer } from '@/containers/ErrorContainer'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type PromiseFn = (...args: any[]) => Promise<any>

type PromiseValue<P extends PromiseFn> = ReturnType<P> extends Promise<infer U>
  ? U
  : never

type UseFetcherReturnType<Fn extends PromiseFn> = [
  PromiseValue<Fn> | undefined,
  boolean,
  (...args: Parameters<Fn>) => Promise<void>
]

export const useFetcher = <Fn extends PromiseFn>(
  fetcher: Fn,
  defaultValue?: PromiseValue<Fn>
): UseFetcherReturnType<Fn> => {
  const { onError } = ErrorContainer.useContainer()

  const [value, setValue] = useState<PromiseValue<Fn> | undefined>(defaultValue)

  const [isLoading, setIsLoading] = useState(false)

  const caller = async (...args: Parameters<Fn>) => {
    setIsLoading(true)

    try {
      const value = await fetcher(...args)
      setValue(value)
      setIsLoading(false)
    } catch (error) {
      onError(error)
      setIsLoading(false)
    }
  }

  return [value, isLoading, caller]
}

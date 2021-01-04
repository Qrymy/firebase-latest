import { FC } from 'react'
import { SWRConfig } from 'swr'
import { ErrorContainer } from '@/containers/ErrorContainer'

export const SwrRoot: FC = ({ children }) => {
  const { onError } = ErrorContainer.useContainer()

  return (
    <SWRConfig value={{ onError, dedupingInterval: 0 }}>{children}</SWRConfig>
  )
}

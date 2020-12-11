import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { ErrorContainer } from '@/containers/ErrorContainer'

const App = ({ Component, pageProps }: AppProps) => {
  const { onError } = ErrorContainer.useContainer()

  return (
    <ErrorContainer.Provider>
      <SWRConfig
        value={{
          onError,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ErrorContainer.Provider>
  )
}

export default App

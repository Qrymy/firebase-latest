import { AppProps } from 'next/app'
import { ErrorContainer } from '@/containers/ErrorContainer'
import { SwrRoot } from '@/components/SwrRoot'

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorContainer.Provider>
    <SwrRoot>
      <Component {...pageProps} />
    </SwrRoot>
  </ErrorContainer.Provider>
)

export default App

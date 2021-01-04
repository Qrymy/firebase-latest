import { AppProps } from 'next/app'
import { ErrorContainer } from '@/containers/ErrorContainer'
import { AuthContainer } from '@/containers/AuthContainer'
import { SwrRoot } from '@/components/SwrRoot'

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorContainer.Provider>
    <AuthContainer.Provider>
      <SwrRoot>
        <Component {...pageProps} />
      </SwrRoot>
    </AuthContainer.Provider>
  </ErrorContainer.Provider>
)

export default App

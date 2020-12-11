import { AppProps } from 'next/app'
import { ErrorContainer } from '@/containers/ErrorContainer'
import { AuthContainer } from '@/containers/AuthContainer'
import { SwrRoot } from '@/components/SwrRoot'
import { AuthRoot } from '@/components/AuthRoot'

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorContainer.Provider>
    <AuthContainer.Provider>
      <SwrRoot>
        <AuthRoot>
          <Component {...pageProps} />
        </AuthRoot>
      </SwrRoot>
    </AuthContainer.Provider>
  </ErrorContainer.Provider>
)

export default App

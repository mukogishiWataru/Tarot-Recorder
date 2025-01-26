import { createSignal } from 'solid-js'
import { LoadingContext } from './Context'
import type { JSX } from 'solid-js'

type LoadingProviderProps = {
  children: JSX.Element
}

function LoadingProvider(props: LoadingProviderProps) {
  const [loading, setLoading] = createSignal(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider

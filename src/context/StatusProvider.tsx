import { createSignal } from 'solid-js'
import { StatusContext } from './Context'
import type { JSX } from 'solid-js'

type LoadingProviderProps = {
  children: JSX.Element
}

function StatusProvider(props: LoadingProviderProps) {
  const [status, setStatus] = createSignal<
    null | 'loading' | 'success' | 'failure'
  >(null)

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {props.children}
    </StatusContext.Provider>
  )
}

export default StatusProvider

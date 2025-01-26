import { createSignal } from 'solid-js'
import { SuccessContext } from './Context'
import type { JSX } from 'solid-js'

type LoadingProviderProps = {
  children: JSX.Element
}

function SuccessProvider(props: LoadingProviderProps) {
  const [success, setSuccess] = createSignal(false)

  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {props.children}
    </SuccessContext.Provider>
  )
}

export default SuccessProvider

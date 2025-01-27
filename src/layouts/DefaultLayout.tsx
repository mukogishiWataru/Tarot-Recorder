import { JSX, useContext } from 'solid-js'
import Header from '~/components/Header'
import { StatusContext } from '~/context/Context'
import LoadingSVG from '~/components/ui/loadingSVG'
import Check from '~/components/icons/Check'

interface DefaultLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { status } = useContext(StatusContext) as any

  return (
    <>
      {status() && (
        <div class="fixed inset-0 z-50 flex justify-center items-center bg-white/75">
          {status() === 'success' && (
            <Check class="size-24 stroke-green-500" strokeWidth={1.5} />
          )}

          {status() === 'loading' && <LoadingSVG />}
          {status() === 'failure' && (
            <div class="text-red-500 text-3xl font-sans">Error</div>
          )}
        </div>
      )}

      <>
        <Header title="Tarot Recorder" />
        <main class="pt-16">{props.children}</main>
        <div>Footer</div>
      </>
    </>
  )
}

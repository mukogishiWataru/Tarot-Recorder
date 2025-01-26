import { JSX, useContext } from 'solid-js'
import Header from '~/components/Header'
import { LoadingContext } from '~/context/Context'
import LoadingSVG from '~/components/ui/loadingSVG'

interface DefaultLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { loading } = useContext(LoadingContext) as any

  return (
    <>
      {loading() && (
        <div class="fixed inset-0 z-50 flex justify-center items-center bg-white/75">
          <LoadingSVG />
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

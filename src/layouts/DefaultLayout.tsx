import { JSX } from 'solid-js'
import Header from '~/components/Header'

interface DefaultLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Header title="Tarot Recorder" />
      <main class="pt-16">{props.children}</main>
      <div>Footer</div>
    </>
  )
}

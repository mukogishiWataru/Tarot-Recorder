import { JSX } from 'solid-js'

interface DefaultLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <div>Header</div>
      {props.children}
      <div>Footer</div>
    </>
  )
}

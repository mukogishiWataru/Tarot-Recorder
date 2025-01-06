import { Component } from 'solid-js'

type HeaderProps = {
  title: string
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <header
      aria-label="Main header"
      class="fixed top-0 left-0 w-full bg-white shadow-lg z-10"
    >
      <h1 class="h-12 w-full text-center flex items-center justify-center">
        {props.title}
      </h1>
      <div class="px-3">
        <hr class="h-[1px] bg-gray-300 mx-auto" />
      </div>
    </header>
  )
}

export default Header

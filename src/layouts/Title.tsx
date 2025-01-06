import { JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

type SectionProps = {
  children: JSX.Element
  class?: string
}

const Title = (props: SectionProps) => {
  const [local, others] = splitProps(props, ['children', 'class'])

  return (
    <section
      class={cn(
        'flex justify-center items-center text-3xl px-4 py-6',
        local.class,
      )}
      // {...others}
    >
      {local.children}
    </section>
  )
}

export default Title

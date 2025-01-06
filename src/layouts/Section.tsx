import { JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

type SectionProps = {
  children: JSX.Element
  class?: string
}

const Section = (props: SectionProps) => {
  const [local, others] = splitProps(props, ['children', 'class'])

  return (
    <section
      class={cn('flex justify-center items-center px-4 py-6', local.class)}
      // {...others}
    >
      <div>{local.children}</div>
    </section>
  )
}

export default Section

import { Button } from '~/components/ui/button'
import Section from '~/layouts/Section'
import { A } from '@solidjs/router'

const Home = () => {
  return (
    <>
      <Section class="">
        <Button as={A} href="/input" variant={'default'}>
          Record
        </Button>
      </Section>
      <Section>
        <Button as={A} href="/view" variant={'default'}>
          View
        </Button>
      </Section>
    </>
  )
}
export default Home

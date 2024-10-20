import LandingCards from 'components/landing-page/LandingCards'
import LandingInfoText from 'components/landing-page/LandingInfoText'
import LandingPageHero from 'components/ui/hero/LandingPageHero'
import Layout from 'components/ui/Layout'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <Layout>
      <LandingPageHero />
      <LandingInfoText />
      <LandingCards />
    </Layout>
  )
}

export default Home

import LandingCards from 'components/landing-page/LandingCards'
import LandingInfoText from 'components/landing-page/LandingInfoText'
import NewLocations from 'components/landing-page/NewLocations'
import PersonalBestGuesses from 'components/landing-page/PersonalBestGuesses'
import LandingPageHero from 'components/ui/hero/LandingPageHero'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUser } from 'stores/authSlice'
import styles from 'styles/scss/pages.module.scss'

const LandingPage: FC = () => {
  const user = useSelector(selectUser)
  const guesses = [1, 5, 12]
  const locations = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <Layout>
      {user ? (
        <Container fluid className={styles.landingPageAuthenticated}>
          <PersonalBestGuesses guesses={guesses} />
          <NewLocations locations={locations} />
        </Container>
      ) : (
        <>
          <LandingPageHero />
          <LandingInfoText />
          <LandingCards />
        </>
      )}
    </Layout>
  )
}

export default LandingPage

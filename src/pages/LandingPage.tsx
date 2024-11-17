import LandingCards from 'components/landing-page/LandingCards'
import LandingInfoText from 'components/landing-page/LandingInfoText'
import NewLocations from 'components/landing-page/NewLocations'
import PersonalBestGuesses from 'components/landing-page/PersonalBestGuesses'
import LandingPageHero from 'components/ui/hero/LandingPageHero'
import Layout from 'components/ui/Layout'
import { FC, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'stores/authSlice'
import styles from 'styles/scss/pages.module.scss'
import * as API from 'api/Api'
import { selectAllLocations, setAllLocations } from 'stores/locationsSlice'

const LandingPage: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const guesses = [1, 5, 12]

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsResponse = await API.getLocations()
        dispatch(setAllLocations(locationsResponse))
      } catch (error) {
        console.error('Failed to fetch user locations:', error)
      }
    }

    fetchLocations()
  }, [dispatch])

  const locations = useSelector(selectAllLocations)

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

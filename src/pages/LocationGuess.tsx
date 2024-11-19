import { FC, useEffect, useState } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import TakeGuessComponent from 'components/location/TakeGuessComponent'
import LeaderboardComponent from 'components/location/LeaderboardComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/store'
import { selectLocation } from 'stores/userSlice'
import { userStorage } from 'utils/localStorage'
import { routes } from 'constants/routesConstants'
import * as API from 'api/Api'

const LocationPage: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useSelector((state: RootState) => selectLocation(state, id!))
  const [guesses, setGuesses] = useState([])
  const token = userStorage.getToken()

  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN)
    }
  }, [token, navigate])

  useEffect(() => {
    if (!token || !id) return

    const fetchGuesses = async () => {
      try {
        const guessesResponse = await API.getGuesses(token, id)
        setGuesses(guessesResponse)
      } catch (error) {
        console.error('Failed to fetch location guesses:', error)
      }
    }

    fetchGuesses()
  }, [id, token])

  if (!location)
    return (
      <Layout>
        <Container className={styles.locationPage}>
          No location data found.
        </Container>
      </Layout>
    )

  return (
    <Layout>
      <Container className={styles.locationPage}>
        <TakeGuessComponent location={location} />
        <LeaderboardComponent guesses={guesses} />
      </Container>
    </Layout>
  )
}

export default LocationPage

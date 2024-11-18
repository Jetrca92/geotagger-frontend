import { FC } from 'react'
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

const LocationPage: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useSelector((state: RootState) => selectLocation(state, id!))
  if (!location)
    return (
      <Layout>
        <Container className={styles.locationPage}>
          No location data found.
        </Container>
      </Layout>
    )

  const token = userStorage.getToken()
  if (!token) {
    navigate(routes.LOGIN)
    return null
  }

  return (
    <Layout>
      <Container className={styles.locationPage}>
        <TakeGuessComponent location={location} />
        <LeaderboardComponent location={location} />
      </Container>
    </Layout>
  )
}

export default LocationPage

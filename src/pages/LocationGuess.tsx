import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import TakeGuessComponent from 'components/location/TakeGuessComponent'
import LeaderboardComponent from 'components/location/LeaderboardComponent'

const LocationPage: FC = () => {
  const location = 1
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

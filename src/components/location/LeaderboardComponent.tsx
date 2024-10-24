import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'

interface Props {
  location: number
}

const LeaderboardComponent: FC<Props> = ({ location }) => {
  return (
    <Container className={styles.leaderboardContainer}>
      <h4 className={styles.takeGuessTitle}>Leaderboard</h4>
    </Container>
  )
}

export default LeaderboardComponent

import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import LocationDetailsComponent from './LocationDetailsComponent'
import { LocationType } from 'models/location'
import { GuessType } from 'models/guess'

interface Props {
  location: LocationType
  onNewGuess: (guess: GuessType) => void
}

const TakeGuessComponent: FC<Props> = ({ location, onNewGuess }) => {
  return (
    <Container className={styles.takeGuessContainer}>
      <h4 className={styles.takeGuessTitle}>
        <span className={styles.blackText}>Take a</span>{' '}
        <span className={styles.primaryText}>guess</span>
        <span className={styles.blackText}>!</span>
      </h4>
      <LocationDetailsComponent location={location} onNewGuess={onNewGuess} />
    </Container>
  )
}

export default TakeGuessComponent

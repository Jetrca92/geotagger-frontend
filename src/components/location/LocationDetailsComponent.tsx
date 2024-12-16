import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import noImage from 'styles/images/no-location-image.png'

import LocationGuessForm from './LocationGuessForm'
import { LocationType } from 'models/location'
import { GuessType } from 'models/guess'

interface Props {
  location: LocationType
  onNewGuess: (guess: GuessType) => void
}

const LocationDetailsComponent: FC<Props> = ({ location, onNewGuess }) => {
  return (
    <Container className={styles.locationDetailsContainer}>
      <div className={styles.locationImageDiv}>
        <img
          src={location.imageUrl || noImage}
          className={styles.locationImage}
          alt="location"
        />
      </div>
      <LocationGuessForm location={location} onNewGuess={onNewGuess} />
    </Container>
  )
}

export default LocationDetailsComponent

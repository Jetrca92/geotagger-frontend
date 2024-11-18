import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import noImage from 'styles/images/no-location-image.png'

import LocationGuessForm from './LocationGuessForm'
import { LocationType } from 'models/location'

interface Props {
  location: LocationType
}

const LocationDetailsComponent: FC<Props> = ({ location }) => {
  return (
    <Container className={styles.locationDetailsContainer}>
      <img
        src={location.imageUrl ? location.imageUrl : noImage}
        className={styles.locationImage}
        alt="location"
      />
      <LocationGuessForm location={location} />
    </Container>
  )
}

export default LocationDetailsComponent

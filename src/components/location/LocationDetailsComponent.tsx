import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import locationImage from 'styles/images/location1.png'
import map from 'styles/images/map.png'
import LocationGuessForm from './LocationGuessForm'

interface Props {
  location: number
}

const LocationDetailsComponent: FC<Props> = ({ location }) => {
  return (
    <Container className={styles.locationDetailsContainer}>
      <img
        src={locationImage}
        className={styles.locationImage}
        alt="location"
      />
      <img src={map} className={styles.locationMap} alt="map" />
      <LocationGuessForm />
    </Container>
  )
}

export default LocationDetailsComponent

import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import LocationDetailsComponent from './LocationDetailsComponent'

interface Props {
  location: number
}

const TakeGuessComponent: FC<Props> = ({ location }) => {
  return (
    <Container className={styles.takeGuessContainer}>
      <h4 className={styles.takeGuessTitle}>
        <span className={styles.blackText}>Take a</span>{' '}
        <span className={styles.primaryText}>guess</span>
        <span className={styles.blackText}>!</span>
      </h4>
      <LocationDetailsComponent location={location} />
    </Container>
  )
}

export default TakeGuessComponent

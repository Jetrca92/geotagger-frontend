import { FC } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import lockedIcon from 'styles/icons/locked-icon.png'
import { LocationType } from 'models/location'

interface Props {
  locked?: boolean
  guess?: number
  location: LocationType
}

const LocationCard: FC<Props> = ({ locked = false, guess, location }) => {
  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={location.imageUrl}
        alt="card"
        className={styles.locationCardImage}
      />
      {locked && (
        <Card.ImgOverlay>
          <div className={styles.gradientOverlay}>
            <img
              src={lockedIcon}
              alt="Locked Icon"
              className={styles.lockedIcon}
            />
          </div>
        </Card.ImgOverlay>
      )}
      {guess && (
        <Card.ImgOverlay>
          <div className={styles.gradientOverlay}>
            <div className={styles.guessText}>{`${guess} m`}</div>
          </div>
        </Card.ImgOverlay>
      )}
    </Card>
  )
}

export default LocationCard

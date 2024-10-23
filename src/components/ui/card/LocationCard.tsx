import { FC } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import lockedIcon from 'styles/icons/locked-icon.png'

interface Props {
  locked?: boolean
  guess?: number
  imageSrc: string
}

const LocationCard: FC<Props> = ({ locked = false, guess, imageSrc }) => {
  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={imageSrc}
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

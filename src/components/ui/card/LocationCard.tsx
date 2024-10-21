import { FC } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import lockedIcon from 'styles/icons/locked-icon.png'

interface Props {
  locked?: boolean
  imageSrc: string
}

const LocationCard: FC<Props> = ({ locked = false, imageSrc }) => {
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
    </Card>
  )
}

export default LocationCard

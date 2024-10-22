import { FC } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  guess?: number
  imageSrc: string
}

const LocationCardSm: FC<Props> = ({ guess, imageSrc }) => {
  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={imageSrc}
        alt="card"
        className={styles.locationCardImageSm}
      />
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

export default LocationCardSm

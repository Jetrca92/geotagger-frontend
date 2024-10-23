import { FC } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import EditButton from '../button/EditButton'
import DeleteButton from '../button/DeleteButton'

interface Props {
  imageSrc: string
}

const MyUploadCard: FC<Props> = ({ imageSrc }) => {
  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={imageSrc}
        alt="card"
        className={styles.locationCardImageSm}
      />
      <Card.ImgOverlay>
        <div className={styles.locationCardImageSmEditButton}>
          <EditButton />
        </div>
        <div className={styles.locationCardImageSmDeleteButton}>
          <DeleteButton />
        </div>
      </Card.ImgOverlay>
    </Card>
  )
}

export default MyUploadCard

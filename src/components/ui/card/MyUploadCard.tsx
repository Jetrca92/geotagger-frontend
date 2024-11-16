import { FC, useState } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import EditButton from '../button/EditButton'
import DeleteButton from '../button/DeleteButton'
import ConfirmDeleteModal from 'components/modals/DeleteModal'
import DeleteModal from 'components/modals/DeleteModal'
import noLocationImage from 'styles/images/no-location-image.png'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'

interface Props {
  upload: LocationType
}

const MyUploadCard: FC<Props> = ({ upload }) => {
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCloseDeleteModal = () => setShow(false)
  const handleShowDeleteModal = () => setShow(true)
  const handleCloseConfirmDeleteModal = () => setShowConfirm(false)
  const handleShowConfirmDeleteModal = () => setShowConfirm(true)

  const onDelete = () => {
    setShowConfirm(true)
  }

  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={upload.imageUrl ? upload.imageUrl : noLocationImage}
        alt="card"
        className={styles.locationCardImageSm}
      />
      <Card.ImgOverlay>
        <Link
          className={styles.locationCardImageSmEditButton}
          to={`${routes.LOCATION_PREFIX}/${upload.id}`}
        >
          <EditButton />
        </Link>
        <div
          className={styles.locationCardImageSmDeleteButton}
          onClick={handleShowDeleteModal}
        >
          <DeleteButton />
        </div>
      </Card.ImgOverlay>

      <DeleteModal show={show} onHide={handleCloseDeleteModal} />
      <ConfirmDeleteModal
        show={showConfirm}
        onHide={handleCloseConfirmDeleteModal}
      />
    </Card>
  )
}

export default MyUploadCard

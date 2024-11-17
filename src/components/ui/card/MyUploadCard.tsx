import { FC, useState } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import EditButton from '../button/EditButton'
import DeleteButton from '../button/DeleteButton'
import ConfirmDeleteModal from 'components/modals/ConfirmDeleteModal'
import DeleteModal from 'components/modals/DeleteModal'
import noLocationImage from 'styles/images/no-location-image.png'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'

interface Props {
  upload: LocationType
  refreshProfilePage: () => void
}

const MyUploadCard: FC<Props> = ({ upload, refreshProfilePage }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const handleCloseDeleteModal = () => setShowDeleteModal(false)
  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false)
    refreshProfilePage()
  }
  const handleShowConfirmationModal = () => setShowConfirmationModal(true)

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

      <DeleteModal
        show={showDeleteModal}
        locationId={upload.id}
        onHide={handleCloseDeleteModal}
        onDelete={handleShowConfirmationModal}
      />
      <ConfirmDeleteModal
        show={showConfirmationModal}
        onHide={handleCloseConfirmationModal}
      />
    </Card>
  )
}

export default MyUploadCard

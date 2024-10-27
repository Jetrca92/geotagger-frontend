import { FC, useState } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import EditButton from '../button/EditButton'
import DeleteButton from '../button/DeleteButton'
import ConfirmDeleteModal from 'components/modals/DeleteModal'
import DeleteModal from 'components/modals/DeleteModal'

interface Props {
  imageSrc: string
}

const MyUploadCard: FC<Props> = ({ imageSrc }) => {
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
        src={imageSrc}
        alt="card"
        className={styles.locationCardImageSm}
      />
      <Card.ImgOverlay>
        <div className={styles.locationCardImageSmEditButton}>
          <EditButton />
        </div>
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

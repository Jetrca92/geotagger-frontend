import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  show: boolean
  onHide: () => void
}

const ConfirmDeleteModal: FC<Props> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h5 className={styles.customModalTitleH5}>
          Your location was deleted.
        </h5>
        <div className={styles.customModalButtons}>
          <div onClick={onHide}>
            <PrimaryButton text="Dismiss" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDeleteModal

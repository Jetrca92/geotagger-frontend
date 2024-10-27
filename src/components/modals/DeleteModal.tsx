import CancelButton from 'components/ui/button/CancelButton'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  show: boolean
  onHide: () => void
}

const DeleteModal: FC<Props> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h4 className={styles.customModalTitle}>Are you sure?</h4>
        <div className={styles.customModalText}>
          This location will be deleted. There is no undo of this action.
        </div>
        <div className={styles.customModalButtons}>
          <div onClick={onHide}>
            <CancelButton text="Cancel" />
          </div>
          <PrimaryButton text="Submit" />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteModal

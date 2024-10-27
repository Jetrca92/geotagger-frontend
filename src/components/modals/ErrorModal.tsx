import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  show: boolean
  onHide: () => void
  errorText: string
  errorCode: string
}

const ErrorModal: FC<Props> = ({ show, onHide, errorText, errorCode }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h5
          className={styles.customModalTitleH5}
        >{`Ooppss! Error code #${errorCode}`}</h5>
        <div className={styles.customModalText}>{errorText}</div>
        <div className={styles.customModalButtons}>
          <div onClick={onHide}>
            <PrimaryButton text="Dismiss" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ErrorModal

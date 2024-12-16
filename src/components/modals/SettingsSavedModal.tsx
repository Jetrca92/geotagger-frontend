import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  show: boolean
  onHide: () => void
}

const SettingsSavedModal: FC<Props> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h5 className={styles.customModalTitleH5}>Information changed.</h5>
        <div className={styles.customModalText}>Your settings are saved.</div>
        <div className={styles.customModalButtons}>
          <div onClick={onHide}>
            <PrimaryButton text="Close" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SettingsSavedModal

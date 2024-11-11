import ProfileSettingsForm from 'components/profile/ProfileSettingsForm'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUser } from 'stores/authSlice'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  show: boolean
  onHide: () => void
}

const ProfileSettingsModal: FC<Props> = ({ show, onHide }) => {
  const user = useSelector(selectUser)
  if (!user)
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body className={styles.customModalBody}>
          <h5 className={styles.customModalTitleH5}>
            <span className={styles.blackText}>Profile </span>
            <span className={styles.primaryText}>settings</span>
            <span className={styles.blackText}>.</span>
          </h5>
          <div className={styles.customModalText}>
            Please login to update your profile.
          </div>
        </Modal.Body>
      </Modal>
    )

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h5 className={styles.customModalTitleH5}>
          <span className={styles.blackText}>Profile </span>
          <span className={styles.primaryText}>settings</span>
          <span className={styles.blackText}>.</span>
        </h5>
        <div className={styles.customModalText}>Change your information.</div>
        <ProfileSettingsForm user={user} onHide={onHide} />
      </Modal.Body>
    </Modal>
  )
}

export default ProfileSettingsModal

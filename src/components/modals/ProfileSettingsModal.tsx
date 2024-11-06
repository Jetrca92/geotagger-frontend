import CancelButton from 'components/ui/button/CancelButton'
import { FC } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  show: boolean
  onHide: () => void
}

const ProfileSettingsModal: FC<Props> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className={styles.customModalBody}>
        <h5 className={styles.customModalTitleH5}>
          <span className={styles.blackText}>Profile </span>
          <span className={styles.primaryText}>settings</span>
          <span className={styles.blackText}>.</span>
        </h5>
        <div className={styles.customModalText}>Change your information.</div>
        <Form className={`${styles.profileSettingsModalForm} container-fluid`}>
          <Form.Group className={styles.profileSettingsModalFormGroup}>
            <Form.Label className={styles.profileSettingsModalFormLabelText}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="hey@geotagger.com"
              className={styles.profileSettingsModalFormControl}
            />
          </Form.Group>

          <Row className={styles.profileSettingsModalFormRow}>
            <Col className={styles.profileSettingsModalFormCol}>
              <Form.Group className={styles.profileSettingsModalFormGroup}>
                <Form.Label
                  className={styles.profileSettingsModalFormLabelText}
                >
                  First name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John"
                  className={styles.profileSettingsModalFormControl}
                />
              </Form.Group>
            </Col>

            <Col className={styles.profileSettingsModalFormCol}>
              <Form.Group className={styles.profileSettingsModalFormGroup}>
                <Form.Label
                  className={styles.profileSettingsModalFormLabelText}
                >
                  Last name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  className={styles.profileSettingsModalFormControl}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className={styles.profileSettingsLinksDiv}>
            <div className={styles.profileSettingsLink}>Change password</div>
            <div className={styles.profileSettingsLink}>
              Change profile picture
            </div>
          </div>

          <div className={styles.customModalButtons}>
            <div onClick={onHide}>
              <CancelButton text="Cancel" />
            </div>
            <div className={styles.submitButtonDiv}>
              <Button className={styles.formButton} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProfileSettingsModal

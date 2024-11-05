import { FC } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'

const ForgotPasswordForm: FC = () => {
  return (
    <Container className={styles.authFormContainer}>
      <div className={styles.authFormTitleContainer}>
        <h3 className={styles.authFormTitle}>Reset Your Password</h3>
        <div className={styles.authFormSubtitle}>
          Enter your email address below and we will send you a link with
          instructions.
        </div>
        <Form>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.labelText}>Email</Form.Label>
            <Form.Control type="email" className={styles.formControl} />
          </Form.Group>

          <Button className={styles.formButton} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default ForgotPasswordForm

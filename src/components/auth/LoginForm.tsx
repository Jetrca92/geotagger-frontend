import { FC } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'

const LoginForm: FC = () => {
  return (
    <Container className={styles.loginFormContainer}>
      <div className={styles.loginFormTitleContainer}>
        <h3 className={styles.loginFormTitle}>Sign in</h3>
        <div className={styles.loginFormSubtitle}>
          Welcome back to Geotagger. We are glad that you are back.
        </div>
        <Form>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.labelText}>Email</Form.Label>
            <Form.Control type="email" className={styles.formControl} />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.labelText}>Password</Form.Label>
            <Form.Control type="password" className={styles.formControl} />
          </Form.Group>

          <Button className={styles.formButton} type="submit">
            Sign in
          </Button>
          <div className={styles.createAccountText}>
            <div className={styles.createAccountTextLeft}>
              Do you want to create an account?
            </div>
            <div className={styles.createAccountTextRight}>Sign up</div>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default LoginForm

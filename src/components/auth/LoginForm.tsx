import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import { FC, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'
import * as API from 'api/Api'
import { errorStore } from 'stores/error.store'
import authStore from 'stores/auth.store'
import { useNavigate } from 'react-router-dom'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useLoginForm()

  useEffect(() => {
    errorStore.clearError()
  }, [])

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await API.login(data)
    if (response.data?.statusCode) {
      errorStore.setError(response.data.message)
      return
    }
    try {
      const user = await API.fetchUser(response.data.access_token)
      authStore.login(user, response.data)
      navigate('/')
    } catch (error) {
      errorStore.setError('Failed to fetch user information')
    }
  })

  return (
    <Container className={styles.authFormContainer}>
      <div className={styles.authFormTitleContainer}>
        <h3 className={styles.authFormTitle}>Sign in</h3>
        <div className={styles.authFormSubtitle}>
          Welcome back to Geotagger. We are glad that you are back.
        </div>
        <Form onSubmit={onSubmit}>
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

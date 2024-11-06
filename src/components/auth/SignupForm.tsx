import { FC, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'
import eyeIcon from 'styles/icons/eye.png'
import UserAvatar from 'components/ui/icons/UserAvatar'
import { errorStore } from 'stores/error.store'
import { useNavigate } from 'react-router-dom'
import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'

const SignupForm: FC = () => {
  useEffect(() => {
    errorStore.clearError()
  }, [])

  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    const response = await API.signup(data)
    if (response.data?.statusCode) {
      errorStore.setError(response.data.message)
    } else {
      // Login user
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode) {
        errorStore.setError(loginResponse.data.message)
      } else {
        try {
          const user = await API.fetchUser(response)
          authStore.login(user, response)
          navigate('/')
        } catch (error) {
          errorStore.setError('Failed to fetch user information')
        }
      }
    }
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword)

  return (
    <Container className={styles.authFormContainer}>
      <div className={styles.authFormTitleContainer}>
        <h3 className={styles.authFormTitle}>Sign up</h3>
        <div className={styles.authFormSubtitle}>
          Your name will appear on posts and your public profle.
        </div>
      </div>
      <Form>
        <Form.Group className={styles.formGroupCentered}>
          <div className={styles.emptyAvatar}>
            <UserAvatar />
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="hey@geotagger.com"
            className={styles.formControl}
          />
        </Form.Group>

        <Row className={styles.signupRow}>
          <Col className={styles.signupCol}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.labelText}>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                className={styles.formControl}
              />
            </Form.Group>
          </Col>

          <Col className={styles.signupCol}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.labelText}>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                className={styles.formControl}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Password</Form.Label>
          <div className={styles.inputWithIcon}>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              className={styles.formControl}
            />
            <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
              <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
            </span>
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Repeat password</Form.Label>
          <div className={styles.inputWithIcon}>
            <Form.Control
              type={showRepeatPassword ? 'text' : 'password'}
              className={styles.formControl}
            />
            <span
              onClick={toggleRepeatPasswordVisibility}
              className={styles.eyeIcon}
            >
              <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
            </span>
          </div>
        </Form.Group>

        <Button className={styles.formButton} type="submit">
          Sign up
        </Button>
        <div className={styles.createAccountText}>
          <div className={styles.createAccountTextLeft}>
            Already have an account?
          </div>
          <div className={styles.createAccountTextRight}>Sign in</div>
        </div>
      </Form>
    </Container>
  )
}

export default SignupForm

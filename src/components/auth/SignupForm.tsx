import { FC, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'
import eyeIcon from 'styles/icons/eye.png'
import UserAvatar from 'components/ui/icons/UserAvatar'

import { Link, useNavigate } from 'react-router-dom'
import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'
import * as API from 'api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'stores/authSlice'
import { clearError, setError } from 'stores/errorSlice'
import { routes } from 'constants/routesConstants'
import { Controller } from 'react-hook-form'
import { RootState } from 'stores/store'

const SignupForm: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const { apiError, showError } = useSelector((state: RootState) => state.error)
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    const { confirmPassword, ...submitData } = data
    const response = await API.signup(submitData)
    if (response.data?.statusCode) {
      dispatch(setError(response.data.message))
    } else {
      // Login user
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode) {
        dispatch(setError(loginResponse.data.message))
      } else {
        try {
          const user = await API.fetchUser(loginResponse)
          dispatch(login({ user, token: loginResponse.data.access_token }))
          navigate('/')
        } catch (error) {
          dispatch(setError('Failed to fetch user information'))
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
      <Form onSubmit={onSubmit}>
        <Form.Group className={styles.formGroupCentered}>
          <div className={styles.emptyAvatar}>
            <UserAvatar />
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="email"
                placeholder="hey@geotagger.com"
                className={styles.formControl}
                isInvalid={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Form.Text className={styles.formErrorText}>
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Row className={styles.signupRow}>
          <Col className={styles.signupCol}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.labelText}>First name</Form.Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="John"
                    className={styles.formControl}
                    isInvalid={!!errors.firstName}
                  />
                )}
              />
              {errors.firstName && (
                <Form.Text className={styles.formErrorText}>
                  {errors.firstName.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col className={styles.signupCol}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.labelText}>Last name</Form.Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Doe"
                    className={styles.formControl}
                    isInvalid={!!errors.lastName}
                  />
                )}
              />
              {errors.lastName && (
                <Form.Text className={styles.formErrorText}>
                  {errors.lastName.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Password</Form.Label>
          <div className={styles.inputWithIcon}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  className={styles.formControl}
                  isInvalid={!!errors.password}
                />
              )}
            />
            <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
              <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
            </span>
          </div>
          {errors.password && (
            <Form.Text className={styles.formErrorText}>
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.labelText}>Repeat password</Form.Label>
          <div className={styles.inputWithIcon}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type={showRepeatPassword ? 'text' : 'password'}
                  className={styles.formControl}
                  isInvalid={!!errors.password}
                />
              )}
            />
            <span
              onClick={toggleRepeatPasswordVisibility}
              className={styles.eyeIcon}
            >
              <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
            </span>
          </div>
          {errors.confirmPassword && (
            <Form.Text className={styles.formErrorText}>
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button className={styles.formButton} type="submit">
          Sign up
        </Button>
        {showError && (
          <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
        )}
        <div className={styles.createAccountText}>
          <div className={styles.createAccountTextLeft}>
            Already have an account?
          </div>
          <Link to={routes.LOGIN} className={styles.createAccountTextRight}>
            Sign in
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignupForm

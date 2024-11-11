import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import { FC, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/auth.module.scss'
import * as API from 'api/Api'
import { Link, useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'stores/authSlice'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { RootState } from 'stores/store'
import { routes } from 'constants/routesConstants'
import { ErrorType } from 'constants/errorConstants'

const LoginForm: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )
  const navigate = useNavigate()

  const { handleSubmit, errors, control } = useLoginForm()

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await API.login(data)
    if (response.data?.statusCode) {
      dispatch(setError(response.data.message))
      return
    }
    try {
      const user = await API.fetchUser(response.data.access_token)
      dispatch(login({ user, token: response.data.access_token }))
      navigate('/')
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'Failed to fetch user information.',
        }),
      )
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
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="email"
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

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.labelText}>Password</Form.Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="password"
                  className={styles.formControl}
                  isInvalid={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <Form.Text className={styles.formErrorText}>
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>

          <Button className={styles.formButton} type="submit">
            Sign in
          </Button>
          {showApiError && (
            <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
          )}
          <div className={styles.createAccountText}>
            <div className={styles.createAccountTextLeft}>
              Do you want to create an account?
            </div>
            <Link to={routes.SIGNUP} className={styles.createAccountTextRight}>
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default LoginForm

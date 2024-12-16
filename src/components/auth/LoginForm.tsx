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
import { setGuesses, setLocations } from 'stores/userSlice'
import GoogleSigninButton from 'components/ui/button/GoogleSigninButton'

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
    const response = await API.login(data, dispatch)

    try {
      const user = await API.fetchUser(response.data.access_token)
      const userLocations = await API.getUserLocations(
        response.data.access_token,
      )
      const userGuesses = await API.getUserGuesses(response.data.access_token)
      dispatch(login({ user, token: response.data.access_token }))
      dispatch(setLocations(userLocations))
      dispatch(setGuesses(userGuesses))
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
        <GoogleSigninButton text="Sign in with Google" />
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
        <div className={styles.createAccountText}>
          <div className={styles.createAccountTextLeft}>
            Forgot your password?
          </div>
          <Link
            to={routes.FORGOT_PASSWORD}
            className={styles.createAccountTextRight}
          >
            Reset password
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default LoginForm

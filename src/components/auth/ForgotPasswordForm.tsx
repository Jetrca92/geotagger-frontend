import {
  ForgotPasswordFormFields,
  useForgotPasswordForm,
} from 'hooks/react-hook-form/useForgotPasswordForm'
import { FC, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { RootState } from 'stores/store'
import styles from 'styles/scss/auth.module.scss'
import * as API from 'api/Api'
import { ErrorType } from 'constants/errorConstants'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const ForgotPasswordForm: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const { handleSubmit, errors, control } = useForgotPasswordForm()

  const onSubmit = handleSubmit(async (data: ForgotPasswordFormFields) => {
    const response = await API.forgotPassword(data)
    if (response.data?.statusCode) {
      dispatch(
        setError({ type: ErrorType.API, message: response.data.message }),
      )
      return
    }
    navigate(routes.HOME)
  })

  return (
    <Container className={styles.authFormContainer}>
      <div className={styles.authFormTitleContainer}>
        <h3 className={styles.authFormTitle}>Reset Your Password</h3>
        <div className={styles.authFormSubtitle}>
          Enter your email address below and we will send you a link with
          instructions.
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

          <Button className={styles.formButton} type="submit">
            Submit
          </Button>
          {showApiError && (
            <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
          )}
        </Form>
      </div>
    </Container>
  )
}

export default ForgotPasswordForm

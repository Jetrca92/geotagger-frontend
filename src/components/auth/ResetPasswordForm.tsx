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
import {
  ResetPasswordFormFields,
  useResetPasswordForm,
} from 'hooks/react-hook-form/useResetPasswordForm'

interface Props {
  token: string
}

const ResetPasswordForm: FC<Props> = ({ token }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const { handleSubmit, errors, control } = useResetPasswordForm()

  const onSubmit = handleSubmit(async (data: ResetPasswordFormFields) => {
    const { confirmNewPassword, ...submitData } = data
    try {
      await API.resetPassword(token, submitData, dispatch)
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'An error occured. Please try again',
        }),
      )
      return
    }
    navigate(routes.LOGIN)
  })

  return (
    <Container className={styles.authFormContainer}>
      <div className={styles.authFormTitleContainer}>
        <h3 className={styles.authFormTitle}>Reset Your Password</h3>
        <div className={styles.authFormSubtitle}>Enter new password below.</div>
        <Form onSubmit={onSubmit}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.labelText}>New password</Form.Label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="password"
                  className={styles.formControl}
                  isInvalid={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && (
              <Form.Text className={styles.formErrorText}>
                {errors.newPassword.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.labelText}>New password</Form.Label>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="password"
                  className={styles.formControl}
                  isInvalid={!!errors.confirmNewPassword}
                />
              )}
            />
            {errors.confirmNewPassword && (
              <Form.Text className={styles.formErrorText}>
                {errors.confirmNewPassword.message}
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

export default ResetPasswordForm

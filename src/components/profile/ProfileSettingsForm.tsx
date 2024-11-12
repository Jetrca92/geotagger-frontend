import { FC, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import * as API from 'api/Api'
import { Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { RootState } from 'stores/store'
import { ErrorType } from 'constants/errorConstants'
import { UserType } from 'models/auth'
import CancelButton from 'components/ui/button/CancelButton'
import {
  ProfileSettingsFields,
  useProfileSettingsForm,
} from 'hooks/react-hook-form/useProfileSettingsForm'
import { userStorage } from 'utils/localStorage'
import { updateUser } from 'stores/authSlice'

interface Props {
  user: UserType
  onHide: () => void
  onSave: () => void
}

const ProfileSettingsForm: FC<Props> = ({ user, onHide, onSave }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const { handleSubmit, errors, control } = useProfileSettingsForm(user)

  const onSubmit = handleSubmit(async (data: ProfileSettingsFields) => {
    const token = userStorage.getToken()
    if (!token) {
      dispatch(setError({ type: ErrorType.API, message: 'No token found' }))
      return
    }
    try {
      const response = await API.updateUser(token, data)
      if (response.data?.statusCode) {
        dispatch(
          setError({ type: ErrorType.API, message: response.data.message }),
        )
        return
      }
      dispatch(updateUser({ user: response }))
      onHide()
      onSave()
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'An error occurred. Please try again.',
        }),
      )
    }
  })

  return (
    <Form
      className={`${styles.profileSettingsModalForm} container-fluid`}
      onSubmit={onSubmit}
    >
      <Form.Group className={styles.profileSettingsModalFormGroup}>
        <Form.Label className={styles.profileSettingsModalFormLabelText}>
          Email
        </Form.Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              type="email"
              className={styles.profileSettingsModalFormControl}
              isInvalid={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Form.Text className={styles.profileSettingsModalFormErrorText}>
            {errors.email.message}
          </Form.Text>
        )}
      </Form.Group>

      <Row className={styles.profileSettingsModalFormRow}>
        <Col className={styles.profileSettingsModalFormCol}>
          <Form.Group className={styles.profileSettingsModalFormGroup}>
            <Form.Label className={styles.profileSettingsModalFormLabelText}>
              First name
            </Form.Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  className={styles.profileSettingsModalFormControl}
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

        <Col className={styles.profileSettingsModalFormCol}>
          <Form.Group className={styles.profileSettingsModalFormGroup}>
            <Form.Label className={styles.profileSettingsModalFormLabelText}>
              Last name
            </Form.Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  className={styles.profileSettingsModalFormControl}
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

      <div className={styles.profileSettingsLinksDiv}>
        <div className={styles.profileSettingsLink}>Change password</div>
        <div className={styles.profileSettingsLink}>Change profile picture</div>
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
      {showApiError && (
        <Form.Text className={styles.profileSettingsModalFormErrorText}>
          {apiError}
        </Form.Text>
      )}
    </Form>
  )
}

export default ProfileSettingsForm

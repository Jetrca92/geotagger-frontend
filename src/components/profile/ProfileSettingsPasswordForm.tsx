import { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import eyeIcon from 'styles/icons/eye.png'
import * as API from 'api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { Controller } from 'react-hook-form'
import { ErrorType } from 'constants/errorConstants'
import {
  ProfileSettingsPasswordFields,
  useProfileSettingsPasswordForm,
} from 'hooks/react-hook-form/useProfileSettingsPasswordForm'
import CancelButton from 'components/ui/button/CancelButton'
import { userStorage } from 'utils/localStorage'
import { RootState } from 'stores/store'

interface Props {
  onHide: () => void
  onSave: () => void
}

const ProfileSettingsPasswordForm: FC<Props> = ({ onHide, onSave }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const { handleSubmit, errors, control } = useProfileSettingsPasswordForm()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword)
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword)
  const toggleConfirmNewPasswordVisibility = () =>
    setShowConfirmNewPassword(!showConfirmNewPassword)

  const onSubmit = handleSubmit(async (data: ProfileSettingsPasswordFields) => {
    const token = userStorage.getToken()
    if (!token) {
      dispatch(setError({ type: ErrorType.API, message: 'No token found' }))
      return
    }
    const { confirmNewPassword, ...submitData } = data

    try {
      const response = await API.updateUserPassword(token, submitData, dispatch)
      if (!response) return
      onHide()
      onSave()
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'An error occured. Please try again',
        }),
      )
      return
    }
  })

  return (
    <Form
      className={`${styles.profileSettingsModalForm} container-fluid`}
      onSubmit={onSubmit}
    >
      <Form.Group className={styles.profileSettingsModalFormGroup}>
        <Form.Label className={styles.profileSettingsModalFormLabelText}>
          Current password
        </Form.Label>
        <div className={styles.inputWithIcon}>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type={showCurrentPassword ? 'text' : 'password'}
                className={styles.profileSettingsModalFormControl}
                isInvalid={!!errors.currentPassword}
              />
            )}
          />
          <span
            onClick={toggleCurrentPasswordVisibility}
            className={styles.eyeIcon}
          >
            <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
          </span>
        </div>
        {errors.currentPassword && (
          <Form.Text className={styles.profileSettingsModalFormErrorText}>
            {errors.currentPassword.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className={styles.profileSettingsModalFormGroup}>
        <Form.Label className={styles.profileSettingsModalFormLabelText}>
          New password
        </Form.Label>
        <div className={styles.inputWithIcon}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type={showNewPassword ? 'text' : 'password'}
                className={styles.profileSettingsModalFormControl}
                isInvalid={!!errors.newPassword}
              />
            )}
          />
          <span
            onClick={toggleNewPasswordVisibility}
            className={styles.eyeIcon}
          >
            <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
          </span>
        </div>
        {errors.newPassword && (
          <Form.Text className={styles.profileSettingsModalFormErrorText}>
            {errors.newPassword.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className={styles.profileSettingsModalFormGroup}>
        <Form.Label className={styles.profileSettingsModalFormLabelText}>
          Repeat new password
        </Form.Label>
        <div className={styles.inputWithIcon}>
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type={showConfirmNewPassword ? 'text' : 'password'}
                className={styles.profileSettingsModalFormControl}
                isInvalid={!!errors.confirmNewPassword}
              />
            )}
          />
          <span
            onClick={toggleConfirmNewPasswordVisibility}
            className={styles.eyeIcon}
          >
            <img src={eyeIcon} alt="eye" className={styles.eyeIcon} />
          </span>
        </div>
        {errors.confirmNewPassword && (
          <Form.Text className={styles.profileSettingsModalFormErrorText}>
            {errors.confirmNewPassword.message}
          </Form.Text>
        )}
      </Form.Group>

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

export default ProfileSettingsPasswordForm

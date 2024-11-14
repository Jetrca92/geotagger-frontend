import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import { RootState } from 'stores/store'
import { isValidFile, uploadUserAvatar } from 'utils/fileUtils'
import { userStorage } from 'utils/localStorage'
import { updateUser } from 'stores/authSlice'
import UserAvatar from 'components/ui/icons/UserAvatar'
import CancelButton from 'components/ui/button/CancelButton'
import { UserType } from 'models/auth'

interface Props {
  onHide: () => void
  onSave: () => void
  user: UserType
}

const ProfileSettingsPictureForm: FC<Props> = ({ onHide, onSave, user }) => {
  const dispatch = useDispatch()
  const { apiError, fileError, showApiError, showFileError } = useSelector(
    (state: RootState) => state.error,
  )

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      if (!isValidFile(myfile, dispatch)) return
      setFile(myfile)
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }, [file])

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      dispatch(
        setError({ type: ErrorType.FILE, message: 'Please upload an avatar' }),
      )
      return
    }

    const token = userStorage.getToken()
    if (!token) {
      dispatch(setError({ type: ErrorType.API, message: 'No token found' }))
      return
    }

    try {
      const response = await uploadUserAvatar(token, user.id, file, dispatch)
      dispatch(updateUser({ user: response }))
      onHide()
      onSave()
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'Failed to update user picture.',
        }),
      )
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className={styles.formGroupCentered}>
        <div className={styles.currentAvatarDiv}>
          <UserAvatar avatarSrc={preview || user.avatarUrl} />
        </div>
        <Form.Label htmlFor="image">
          <div
            className={styles.customSecondaryButton}
            style={{ cursor: 'pointer' }}
          >
            Upload new picture
          </div>
        </Form.Label>
        <Form.Control
          onChange={handleFileChange}
          id="image"
          name="image"
          type="file"
          style={{ display: 'none' }}
        />
        {showFileError && (
          <Form.Text className={styles.profileSettingsModalFormErrorText}>
            {fileError}
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

export default ProfileSettingsPictureForm

import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LocationType } from 'models/location'
import { setupLeafletDefaultIcon } from 'utils/leafletMarkerUtils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'stores/store'
import { clearAllErrors } from 'stores/errorSlice'
import { isValidFile, uploadLocationImage } from 'utils/fileUtils'
import { routes } from 'constants/routesConstants'
import noLocation from 'styles/images/no-location-image.png'
import * as API from 'api/Api'
import { setLocations } from 'stores/userSlice'

interface Props {
  location: LocationType
  token: string
}

const EditLocationForm: FC<Props> = ({ location, token }) => {
  setupLeafletDefaultIcon()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { apiError, fileError, showApiError, showFileError } = useSelector(
    (state: RootState) => state.error,
  )

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.id === 'locationImage' && target.files) {
      const myfile = target.files[0]
      if (!isValidFile(myfile, dispatch)) return
      setFile(myfile)
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(location.imageUrl ? location.imageUrl : noLocation)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }, [file, location.imageUrl])

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (file) {
      await uploadLocationImage(location.id, token, file, dispatch)
      const locationsResponse = await API.getUserLocations(token)
      dispatch(setLocations(locationsResponse))
      navigate(routes.PROFILE)
      return
    }
  }

  return (
    <Container className={styles.addLocationFormContainer}>
      <Form className={styles.addLocationForm} onSubmit={onSubmit}>
        <div className={styles.imagePreviewDiv}>
          {preview ? (
            <img src={preview} alt="Preview" className={styles.imagePreview} />
          ) : (
            <img
              src={noLocation}
              alt="Location"
              className={styles.imagePreview}
            />
          )}
        </div>
        {showFileError && (
          <Form.Text className={styles.formErrorText}>{fileError}</Form.Text>
        )}
        <div className={styles.locationAddressText}>{location.address}</div>
        <Form.Group className={styles.editLocationFormActions}>
          <div>
            <Form.Label
              className={styles.uploadImageButtonDiv}
              htmlFor="locationImage"
            >
              <div className={styles.uploadImageButton}>Upload image</div>
            </Form.Label>
            <Form.Control
              onChange={handleFileChange}
              id="locationImage"
              name="image"
              type="file"
              style={{ display: 'none' }}
            />
          </div>
          <div className={styles.actionsRight}>
            <div className={styles.formButtonDiv}>
              <Button className={styles.formButton} type="submit">
                Save
              </Button>
            </div>
            <Link to="/" className={styles.signInLink}>
              Cancel
            </Link>
          </div>
          {showApiError && (
            <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
          )}
        </Form.Group>
      </Form>
    </Container>
  )
}

export default EditLocationForm

import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import mapImage from 'styles/images/map.png'
import noLocation from 'styles/images/no-location-image.png'
import {
  AddLocationFields,
  useAddLocationForm,
} from 'hooks/react-hook-form/useAddLocationForm'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'stores/store'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { isValidFile, uploadLocationImage } from 'utils/fileUtils'
import * as API from 'api/Api'
import { ErrorType } from 'constants/errorConstants'
import { userStorage } from 'utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { Controller } from 'react-hook-form'

const AddLocationForm: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useAddLocationForm()
  const { apiError, fileError, showApiError, showFileError } = useSelector(
    (state: RootState) => state.error,
  )

  const [locationImageFile, setLocationImageFile] = useState<File | null>(null)
  const [locationImagePreview, setLocationImagePreview] = useState<
    string | null
  >(null)

  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.id === 'locationImage' && target.files) {
      const myfile = target.files[0]
      if (!isValidFile(myfile, dispatch)) return
      setLocationImageFile(myfile)
    }
  }

  useEffect(() => {
    if (!locationImageFile) {
      setLocationImagePreview(null)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setLocationImagePreview(reader.result as string)
    reader.readAsDataURL(locationImageFile)
  }, [locationImageFile])

  const onSubmit = handleSubmit(async (data: AddLocationFields) => {
    if (!locationImageFile) {
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
      const response = await API.addLocation(token, data)

      if (response.statusCode) {
        dispatch(setError({ type: ErrorType.API, message: response.message }))
        return
      }

      await uploadLocationImage(response.id, token, locationImageFile, dispatch)
      navigate(routes.PROFILE)
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'Failed to add Location',
        }),
      )
    }
  })

  return (
    <Container className={styles.addLocationFormContainer}>
      <Form className={styles.addLocationForm} onSubmit={onSubmit}>
        <div className={styles.imagePreviewDiv}>
          {locationImagePreview ? (
            <img
              src={locationImagePreview}
              alt="Preview"
              className={styles.imagePreview}
            />
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
        <Form.Group>
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
        </Form.Group>

        <img src={mapImage} alt="map" className={styles.mapImage} />

        <Form.Group>
          <Form.Label className={styles.locationInputLabel}>
            Location
          </Form.Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                className={styles.locationInput}
                isInvalid={!!errors.address}
              />
            )}
          />
          {errors.address && (
            <Form.Text className={styles.formErrorText}>
              {errors.address.message}
            </Form.Text>
          )}
        </Form.Group>

        <div className={styles.formButtonDiv}>
          <Button className={styles.formButton} type="submit">
            Add new
          </Button>
        </div>
        {showApiError && (
          <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
        )}
      </Form>
    </Container>
  )
}

export default AddLocationForm

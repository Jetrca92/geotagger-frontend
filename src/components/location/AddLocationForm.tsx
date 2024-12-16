import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
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
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { setupLeafletDefaultIcon } from 'utils/leafletMarkerUtils'
import { setLocations } from 'stores/userSlice'

const AddLocationForm: FC = () => {
  setupLeafletDefaultIcon()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleSubmit, errors, control, setValue } = useAddLocationForm()
  const { apiError, fileError, showApiError, showFileError } = useSelector(
    (state: RootState) => state.error,
  )

  const [locationImageFile, setLocationImageFile] = useState<File | null>(null)
  const [locationImagePreview, setLocationImagePreview] = useState<
    string | null
  >(null)
  const mapCenter = { lat: 46.361618, lng: 14.095287 } // Default to Bled
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
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
      const response = await API.addLocation(token, data, dispatch)

      await uploadLocationImage(response.id, token, locationImageFile, dispatch)

      const locationsResponse = await API.getUserLocations(token)
      dispatch(setLocations(locationsResponse))

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

  const LocationSelector = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng
        setSelectedPosition([lat, lng])
        setValue('latitude', lat.toFixed(5))
        setValue('longitude', lng.toFixed(5))

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          )

          if (response.ok) {
            const data = await response.json()
            const address =
              data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
            setValue('address', address)
          } else {
            console.error('Failed to fetch address')
            setValue('address', `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
          }
        } catch (error) {
          console.error('Error during reverse geocoding:', error)
          setValue('address', `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        }
      },
    })
    return selectedPosition ? <Marker position={selectedPosition} /> : null
  }

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

        <MapContainer center={mapCenter} zoom={10} className={styles.mapImage}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationSelector />
        </MapContainer>

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

        {/* hidden inputs for lat and long */}
        <Controller
          name="latitude"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              type="hidden"
              value={selectedPosition ? selectedPosition[0] : ''}
            />
          )}
        />
        <Controller
          name="longitude"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              type="hidden"
              value={selectedPosition ? selectedPosition[1] : ''}
            />
          )}
        />

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

import { LocationType } from 'models/location'
import { FC, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import { setupLeafletDefaultIcon } from 'utils/leafletMarkerUtils'
import { Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  AddLocationFields,
  useAddLocationForm,
} from 'hooks/react-hook-form/useAddLocationForm'
import { RootState } from 'stores/store'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { userStorage } from 'utils/localStorage'
import { ErrorType } from 'constants/errorConstants'
import * as API from 'api/Api'
import { setGuesses } from 'stores/userSlice'
import { errorDistanceString } from 'utils/helpers'
import { updateUser } from 'stores/authSlice'
import { GuessType } from 'models/guess'

interface Props {
  location: LocationType
  onNewGuess: (guess: GuessType) => void
}

const LocationGuessForm: FC<Props> = ({ location, onNewGuess }) => {
  setupLeafletDefaultIcon()
  const dispatch = useDispatch()
  const { handleSubmit, control, setValue } = useAddLocationForm()
  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const [guessedLocation, setGuessedLocation] = useState('')
  const [errorDistance, setErrorDistance] = useState('')
  const mapCenter = { lat: 46.361618, lng: 14.095287 } // Default to Bled
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null)

  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const LocationSelector = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng
        setSelectedPosition([lat, lng])
        setValue('latitude', lat.toFixed(5))
        setValue('longitude', lng.toFixed(5))
        setValue('address', `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
      },
    })
    return selectedPosition ? <Marker position={selectedPosition} /> : null
  }

  const onSubmit = handleSubmit(async (data: AddLocationFields) => {
    const token = userStorage.getToken()
    if (!token) {
      dispatch(setError({ type: ErrorType.API, message: 'No token found' }))
      return
    }

    try {
      const response = await API.addGuess(token, location.id, data)

      if (response.statusCode) {
        dispatch(setError({ type: ErrorType.API, message: response.message }))
        return
      }
      onNewGuess(response)
      const errorDistance = errorDistanceString(response.errorDistance)
      setErrorDistance(errorDistance)
      setGuessedLocation(response.address)

      const guessResponse = await API.getUserLocations(token)
      dispatch(setGuesses(guessResponse))

      const userResponse = await API.fetchUser(token)
      dispatch(updateUser({ user: userResponse }))
    } catch (error) {
      dispatch(
        setError({
          type: ErrorType.API,
          message: 'Failed to add Guess',
        }),
      )
    }
  })

  return (
    <Container className={styles.locationFormContainer}>
      <Form onSubmit={onSubmit}>
        <MapContainer center={mapCenter} zoom={10} className={styles.mapImage}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationSelector />
        </MapContainer>

        <Row className={styles.locationGuessFormRow}>
          <Col className={styles.locationFormLeftCol}>
            <Form.Group>
              <Form.Label className={styles.labelText}>
                Guessed location
              </Form.Label>
              <Form.Control
                type="text"
                id="addressDisplay"
                className={styles.formControl}
                value={guessedLocation}
                onChange={(e) => setGuessedLocation(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col className={styles.locationFormRightCol}>
            <Form.Group>
              <Form.Label className={styles.labelText}>
                Error distance
              </Form.Label>
              <Form.Control
                type="text"
                id="errorDistance"
                value={errorDistance}
                onChange={(e) => setErrorDistance(e.target.value)}
                className={styles.formControl}
              />
            </Form.Group>
          </Col>
        </Row>

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
            Guess
          </Button>
        </div>
        {showApiError && (
          <Form.Text className={styles.formErrorText}>{apiError}</Form.Text>
        )}
      </Form>
    </Container>
  )
}

export default LocationGuessForm

import { FC, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import lockedIcon from 'styles/icons/locked-icon.png'
import { LocationType } from 'models/location'
import { GuessType } from 'models/guess'
import { errorDistanceString } from 'utils/helpers'
import * as API from 'api/Api'
import { useDispatch } from 'react-redux'
import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import emptyImage from 'styles/images/no-location-image.png'

interface Props {
  locked?: boolean
  guess?: GuessType
  landingImage?: string
}

const LocationCard: FC<Props> = ({ locked = false, guess, landingImage }) => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState<LocationType | null>(null)
  useEffect(() => {
    if (!guess?.locationId) return

    const fetchLocation = async (id: string) => {
      try {
        const locationResponse = await API.getLocationById(id)
        setLocation(locationResponse)
      } catch (error) {
        dispatch(
          setError({
            type: ErrorType.API,
            message: 'Failed to fetch location.',
          }),
        )
      }
    }

    fetchLocation(guess.locationId)
  }, [guess?.locationId, dispatch])

  if (landingImage)
    return (
      <Card className={styles.locationCard}>
        <Card.Img
          src={landingImage}
          alt="card"
          className={styles.locationCardImage}
        />
      </Card>
    )

  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={location?.imageUrl ? location?.imageUrl : emptyImage}
        alt="card"
        className={styles.locationCardImage}
      />
      {locked && (
        <Card.ImgOverlay>
          <div className={styles.gradientOverlay}>
            <img
              src={lockedIcon}
              alt="Locked Icon"
              className={styles.lockedIcon}
            />
          </div>
        </Card.ImgOverlay>
      )}
      {guess?.errorDistance && (
        <Card.ImgOverlay>
          <div className={styles.gradientOverlay}>
            <div className={styles.guessText}>
              {errorDistanceString(guess.errorDistance)}
            </div>
          </div>
        </Card.ImgOverlay>
      )}
    </Card>
  )
}

export default LocationCard

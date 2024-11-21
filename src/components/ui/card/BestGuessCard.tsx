import { GuessType } from 'models/guess'
import { LocationType } from 'models/location'
import { FC, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import * as API from 'api/Api'
import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import emptyImage from 'styles/images/no-location-image.png'
import { errorDistanceString } from 'utils/helpers'

interface Props {
  guess: GuessType
}

const BestGuessCard: FC<Props> = ({ guess }) => {
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

  return (
    <Card className={styles.locationCard}>
      <Card.Img
        src={location?.imageUrl || emptyImage}
        alt="card"
        className={styles.locationCardImageSm}
      />
      {guess && (
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

export default BestGuessCard

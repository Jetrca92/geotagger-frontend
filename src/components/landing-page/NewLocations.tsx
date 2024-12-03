import { FC, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import LocationCard from 'components/ui/card/LocationCard'
import { LocationType } from 'models/location'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import emptyImage from 'styles/images/no-location-image.png'
import SecondaryButton from 'components/ui/button/SecondaryButton'

interface Props {
  locations?: LocationType[]
}

const NewLocations: FC<Props> = ({ locations = [] }) => {
  const [visibleCount, setVisibleCount] = useState(9)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9)
  }

  return (
    <Container className={styles.personalBestGuessesContainer}>
      <Container className={styles.personalBestGuessesTitleCard}>
        <div className={styles.personalBestGuessesTitleDiv}>
          <h4 className={styles.personalBestGuessesTitle}>New locations</h4>
          <div className={styles.personalBestGuessesSubtitle}>
            New uploads from users. Try to guess all the locations by pressing
            on a picture.
          </div>
        </div>
        {locations.length > 0 ? (
          <Container className={styles.bestGuessesContainer}>
            <Row className={styles.personalBestGuessesRow}>
              {locations.slice(0, visibleCount).map((location, index) => (
                <Col
                  key={index}
                  sm={12}
                  md={6}
                  lg={4}
                  className={styles.personalBestGuessesCol}
                >
                  <Link to={`${routes.LOCATION_PREFIX}/${location.id}`}>
                    <LocationCard
                      landingImage={location.imageUrl || emptyImage}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
            {visibleCount < locations.length && (
              <div className={styles.loadMoreBtnDiv} onClick={loadMore}>
                <SecondaryButton text="Load more" />
              </div>
            )}
          </Container>
        ) : (
          <>No locations available.</>
        )}
      </Container>
    </Container>
  )
}

export default NewLocations

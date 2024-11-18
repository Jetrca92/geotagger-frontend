import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import LocationCard from 'components/ui/card/LocationCard'
import { LocationType } from 'models/location'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

interface Props {
  locations?: LocationType[]
}

const NewLocations: FC<Props> = ({ locations }) => {
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
        {locations && locations.length !== 0 ? (
          <Container className={styles.bestGuessesContainer}>
            <Row className={styles.personalBestGuessesRow}>
              {locations.map((location, index) => (
                <Col
                  key={index}
                  sm={12}
                  md={6}
                  lg={4}
                  className={styles.personalBestGuessesCol}
                >
                  <Link to={`${routes.LOCATION_PREFIX}/${location.id}`}>
                    <LocationCard location={location} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <></>
        )}
      </Container>
    </Container>
  )
}

export default NewLocations

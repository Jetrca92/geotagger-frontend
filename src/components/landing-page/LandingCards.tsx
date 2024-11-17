import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import LocationCard from 'components/ui/card/LocationCard'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'

const LandingCards: FC = () => {
  const location: LocationType = {
    id: '12',
    latitude: 123,
    longitude: 123,
    imageUrl: '124l.jpg',
    address: 'address',
    ownerId: '123',
  }

  return (
    <Container fluid className={styles.landingCards}>
      <Row className={styles.landingCardsRow}>
        <Col xs={12} sm={6} md={4} className={styles.landingCardsCol}>
          <LocationCard location={location} locked={true} />
        </Col>
        <Col xs={12} sm={6} md={4} className={styles.landingCardsCol}>
          <LocationCard location={location} locked={true} />
        </Col>
        <Col xs={12} sm={6} md={4} className={styles.landingCardsCol}>
          <LocationCard location={location} locked={true} />
        </Col>
      </Row>
      <Container className={styles.landingCardsButtonContainer}>
        <Link to={routes.SIGNUP}>
          <PrimaryButton text="Sign up" />
        </Link>
      </Container>
    </Container>
  )
}

export default LandingCards

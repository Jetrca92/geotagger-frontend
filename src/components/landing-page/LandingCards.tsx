import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import cardImage1 from 'styles/images/landing-card1.png'
import cardImage2 from 'styles/images/landing-card2.png'
import cardImage3 from 'styles/images/landing-card3.png'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import LocationCard from 'components/ui/card/LocationCard'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
const LandingCards: FC = () => {
  return (
    <Container fluid className={styles.landingCards}>
      <Row className={styles.landingCardsRow}>
        <Col xs={12} sm={6} md={4} className={styles.landingCardsCol}>
          <LocationCard imageSrc={cardImage1} locked={true} />
        </Col>
        <Col xs={12} sm={6} md={4} className={styles.landingCardsCol}>
          <LocationCard imageSrc={cardImage2} locked={true} />
        </Col>
        <Col xs={12} sm={6} md={4} className={styles.landingCardsCol}>
          <LocationCard imageSrc={cardImage3} locked={true} />
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

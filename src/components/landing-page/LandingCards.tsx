import { FC } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import cardImage1 from 'styles/images/landing-card1.png'
import cardImage2 from 'styles/images/landing-card2.png'
import cardImage3 from 'styles/images/landing-card3.png'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import LocationCard from 'components/ui/card/LocationCard'
const LandingCards: FC = () => {
  return (
    <Container fluid className={styles.landingCards}>
      <Row className={styles.landingCardsRow}>
        <Col className={styles.landingCardsCol}>
          <LocationCard imageSrc={cardImage1} locked={true} />
        </Col>

        <Col className={styles.landingCardsCol}>
          <Card className={styles.landingCardsCustomCard}>
            <Card.Img src={cardImage2} alt="card" />
          </Card>
        </Col>

        <Col className={styles.landingCardsCol}>
          <Card className={styles.landingCardsCustomCard}>
            <Card.Img src={cardImage3} alt="card" />
          </Card>
        </Col>
      </Row>
      <Container className={styles.landingCardsButtonContainer}>
        <PrimaryButton text="Sign up" />
      </Container>
    </Container>
  )
}

export default LandingCards

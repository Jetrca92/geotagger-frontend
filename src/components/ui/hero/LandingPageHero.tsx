import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import heroImage from 'styles/images/landing-page-background.png'
import PrimaryButton from 'components/ui/button/PrimaryButton'

const LandingPageHero: FC = () => {
  return (
    <Container fluid className={styles.heroContainer}>
      <Row className={styles.heroRow}>
        <Col xs={12} md={3} className={styles.heroCard}>
          <div className={styles.signUpHeroTitle}>
            Explore the world with Geotagger!
          </div>
          <div className={styles.signUpHeroText}>
            Geotagger is website that allows you to post picture and tag it on
            the map. Other user than try to locate it via Google Maps.
          </div>
          <PrimaryButton text="Sign up" />
        </Col>
        <Col xs={12} md={9} className={styles.heroImage}>
          <img src={heroImage} alt="Hero" />
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPageHero

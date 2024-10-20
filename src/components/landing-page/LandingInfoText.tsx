import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'

const LandingInfoText: FC = () => {
  return (
    <Container fluid className={styles.infoTextContainer}>
      <h4 className={styles.infoTextTitle}>Try yourself at Geotagger!</h4>
      <div className={styles.infoTextSubtitle}>
        Try to guess the location of image by selecting position on the map.
        When you guess it, it gives you the error distance.
      </div>
    </Container>
  )
}

export default LandingInfoText

import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import cardImage from 'styles/images/landing-card3.png'
import LocationCard from 'components/ui/card/LocationCard'

interface Props {
  locations?: number[]
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
                  <LocationCard imageSrc={cardImage} />
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

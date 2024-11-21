import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import LocationCard from 'components/ui/card/LocationCard'
import { GuessType } from 'models/guess'

interface Props {
  guesses?: GuessType[]
}

const PersonalBestGuesses: FC<Props> = ({ guesses }) => {
  return (
    <Container className={styles.personalBestGuessesContainer}>
      <Container className={styles.personalBestGuessesTitleCard}>
        <div className={styles.personalBestGuessesTitleDiv}>
          <h4 className={styles.personalBestGuessesTitle}>
            Personal best guesses
          </h4>
          <div className={styles.personalBestGuessesSubtitle}>
            Your personal best guesses appear here. Go on and try to beat your
            personal records or set a new one!
          </div>
        </div>
        {guesses && guesses.length !== 0 ? (
          <Container fluid className={styles.bestGuessesContainer}>
            <Row className={styles.personalBestGuessesRow}>
              {guesses.map((guess, index) => (
                <Col
                  key={index}
                  sm={12}
                  md={6}
                  lg={4}
                  className={styles.personalBestGuessesCol}
                >
                  <LocationCard guess={guess} />
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

export default PersonalBestGuesses

import { FC, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/landing-page.module.scss'
import LocationCard from 'components/ui/card/LocationCard'
import { GuessType } from 'models/guess'
import SecondaryButton from 'components/ui/button/SecondaryButton'

interface Props {
  guesses?: GuessType[]
}

const PersonalBestGuesses: FC<Props> = ({ guesses = [] }) => {
  const [visibleCount, setVisibleCount] = useState(3)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3)
  }

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
        {guesses.length > 0 ? (
          <Container fluid className={styles.bestGuessesContainer}>
            <Row className={styles.personalBestGuessesRow}>
              {guesses.slice(0, visibleCount).map((guess, index) => (
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
            {visibleCount < guesses.length && (
              <div className={styles.loadMoreBtnDiv} onClick={loadMore}>
                <SecondaryButton text="Load more" />
              </div>
            )}
          </Container>
        ) : (
          <></>
        )}
      </Container>
    </Container>
  )
}

export default PersonalBestGuesses

import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'
import cardImage from 'styles/images/landing-card1.png'
import BestGuessCard from 'components/ui/card/BestGuessCard'

interface Props {
  guesses?: number[]
}

const MyBestGuessesComponent: FC<Props> = ({ guesses }) => {
  if (guesses?.length === 0 || !guesses)
    return (
      <Container className={styles.myBestGuessesContainer}>
        <h5 className={styles.myBestGuessesTitle}>My best guesses</h5>
        <div className={styles.myBestGuessesEmptyContent}>
          <div className={styles.myBestGuessesEmptyContentText}>
            <div className={styles.myBestGuessesEmptyContentTextTitle}>
              No best guesses yet!
            </div>
            <div className={styles.myBestGuessesEmptyContentTextSubtitle}>
              Start new game and guess the location of the picture to get the
              results here!
            </div>
          </div>
          <div>
            <PrimaryButton text="Go to locations" />
          </div>
        </div>
      </Container>
    )
  return (
    <Container className={styles.myBestGuessesContainer}>
      <h5 className={styles.myBestGuessesTitle}>My best guesses</h5>
      <Row className={styles.myBestGuessesRow}>
        {guesses.map((guess, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={3}
            className={styles.myBestGuessesCol}
          >
            <BestGuessCard guess={guess} imageSrc={cardImage} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MyBestGuessesComponent

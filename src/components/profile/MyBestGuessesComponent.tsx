import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'
import BestGuessCard from 'components/ui/card/BestGuessCard'
import { GuessType } from 'models/guess'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import SecondaryButton from 'components/ui/button/SecondaryButton'

interface Props {
  guesses?: GuessType[]
}

const MyBestGuessesComponent: FC<Props> = ({ guesses = [] }) => {
  const [visibleCount, setVisibleCount] = useState(4)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4)
  }

  if (guesses?.length === 0)
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
          <Link to={routes.HOME}>
            <PrimaryButton text="Go to locations" />
          </Link>
        </div>
      </Container>
    )

  return (
    <Container className={styles.myBestGuessesContainer}>
      <h5 className={styles.myBestGuessesTitle}>My best guesses</h5>
      <Row className={styles.myBestGuessesRow}>
        {guesses.slice(0, visibleCount).map((guess, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={3}
            className={styles.myBestGuessesCol}
          >
            <BestGuessCard guess={guess} />
          </Col>
        ))}
      </Row>
      {visibleCount < guesses.length && (
        <div className={styles.loadMoreBtnDiv} onClick={loadMore}>
          <SecondaryButton text="Load more" />
        </div>
      )}
    </Container>
  )
}

export default MyBestGuessesComponent

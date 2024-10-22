import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'

interface Props {
  guesses?: []
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
  return <Container className={styles.myBestGuessesContainer}></Container>
}

export default MyBestGuessesComponent

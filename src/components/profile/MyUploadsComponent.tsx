import PrimaryButton from 'components/ui/button/PrimaryButton'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'

interface Props {
  guesses?: []
}

const MyUploadsComponent: FC<Props> = ({ guesses }) => {
  if (guesses?.length === 0 || !guesses)
    return (
      <Container className={styles.myBestGuessesContainer}>
        <h5 className={styles.myBestGuessesTitle}>My uploads</h5>
        <div className={styles.myBestGuessesEmptyContent}>
          <div className={styles.myBestGuessesEmptyContentText}>
            <div className={styles.myBestGuessesEmptyContentTextTitle}>
              No uploads yet!
            </div>
            <div className={styles.myBestGuessesEmptyContentTextSubtitle}>
              Upload new location with the click on button bellow or in
              navigation bar press the “+” button.
            </div>
          </div>
          <div>
            <PrimaryButton text="Add location" />
          </div>
        </div>
      </Container>
    )
  return <Container className={styles.myBestGuessesContainer}></Container>
}

export default MyUploadsComponent

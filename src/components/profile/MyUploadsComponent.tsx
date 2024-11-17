import PrimaryButton from 'components/ui/button/PrimaryButton'
import MyUploadCard from 'components/ui/card/MyUploadCard'
import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'
import { LocationType } from 'models/location'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

interface Props {
  uploads?: LocationType[]
}

const MyUploadsComponent: FC<Props> = ({ uploads }) => {
  if (uploads?.length === 0 || !uploads)
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
          <Link to={routes.ADD_LOCATION}>
            <PrimaryButton text="Add location" />
          </Link>
        </div>
      </Container>
    )

  return (
    <Container className={styles.myBestGuessesContainer}>
      <h5 className={styles.myBestGuessesTitle}>My uploads</h5>
      <Row className={styles.myBestGuessesRow}>
        {uploads.map((upload, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={3}
            className={styles.myBestGuessesCol}
          >
            <MyUploadCard upload={upload} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MyUploadsComponent

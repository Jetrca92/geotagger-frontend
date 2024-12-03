import PrimaryButton from 'components/ui/button/PrimaryButton'
import MyUploadCard from 'components/ui/card/MyUploadCard'
import { FC, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'
import { LocationType } from 'models/location'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import SecondaryButton from 'components/ui/button/SecondaryButton'

interface Props {
  uploads?: LocationType[]
  refreshProfilePage: () => void
}

const MyUploadsComponent: FC<Props> = ({
  uploads = [],
  refreshProfilePage,
}) => {
  const [visibleCount, setVisibleCount] = useState(4)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4)
  }

  if (uploads?.length === 0)
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
        {uploads.slice(0, visibleCount).map((upload, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={3}
            className={styles.myBestGuessesCol}
          >
            <MyUploadCard
              upload={upload}
              refreshProfilePage={refreshProfilePage}
            />
          </Col>
        ))}
      </Row>
      {visibleCount < uploads.length && (
        <div className={styles.loadMoreBtnDiv} onClick={loadMore}>
          <SecondaryButton text="Load more" />
        </div>
      )}
    </Container>
  )
}

export default MyUploadsComponent

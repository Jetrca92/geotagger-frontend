import { FC } from 'react'
import { Container, Table } from 'react-bootstrap'
import styles from 'styles/scss/activity-log.module.scss'
import searchIcon from 'styles/icons/search-icon.png'

interface Props {
  activities?: number[]
}

const ActivitiesTable: FC<Props> = ({ activities }) => {
  if (!activities)
    return (
      <Container className={styles.activitiesTableContainer}>
        <Table striped className={styles.activitiesTable}>
          <thead>
            <tr>
              <th className={styles.userTableHead}>
                <div className={styles.fullTableWidth}>User</div>
              </th>
              <th className={styles.middleTableHead}>
                <div className={styles.fullTableWidth}>Date/Time</div>
              </th>
              <th className={styles.middleTableHead}>
                <div className={styles.fullTableWidth}>Action</div>
              </th>
              <th className={styles.middleTableHead}>
                <div className={styles.fullTableWidth}>Component type</div>
              </th>
              <th className={styles.middleTableHead}>
                <div className={styles.fullTableWidth}>New value</div>
              </th>
              <th className={styles.locationTableHead}>
                <div className={styles.fullTableWidth}>Location of action</div>
              </th>
            </tr>
          </thead>
        </Table>
        <div className={styles.emptyActivitiesDiv}>
          <div className={styles.searchIconDiv}>
            <img
              src={searchIcon}
              className={styles.searchIconImg}
              alt="search"
            />
          </div>
          <div className={styles.emptyActivitiesContent}>
            <h5 className={styles.emptyActivitiesTitle}>
              No activity log found
            </h5>
            <div className={styles.emptyActivitiesText}>
              No activity log found. Refresh the page.
            </div>
          </div>
        </div>
      </Container>
    )
  return (
    <Container className={styles.activitiesTableContainer}>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Date/Time</th>
            <th>Action</th>
            <th>Component type</th>
            <th>New value</th>
            <th>Location of action</th>
          </tr>
        </thead>
      </Table>
    </Container>
  )
}

export default ActivitiesTable

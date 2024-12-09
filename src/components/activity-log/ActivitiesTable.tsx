import { FC } from 'react'
import { Container, Table } from 'react-bootstrap'
import styles from 'styles/scss/activity-log.module.scss'
import searchIcon from 'styles/icons/search-icon.png'
import UserAvatar from 'components/ui/icons/UserAvatar'
import { LogType } from 'models/log'

interface Props {
  activities?: LogType[]
}

const ActivitiesTable: FC<Props> = ({ activities = [] }) => {
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
        {activities.length > 0 && (
          <tbody>
            {activities.map((activity, index) => (
              <tr className={styles.locationTableBodyRow} key={index}>
                <td className={styles.userTableBody}>
                  <div className={styles.userTableBodyFlex}>
                    <div className={styles.userAvatar}>
                      <UserAvatar avatarSrc={activity.user.avatarUrl} />
                    </div>
                    <div className={styles.fullTableWidthCenter}>
                      {activity.user.firstName} {activity.user.lastName}
                    </div>
                  </div>
                </td>
                <td className={styles.middleTableBody}>
                  <div className={styles.fullTableWidthDate}>
                    <div>2024-10-20</div>
                    <div>14:35:22</div>
                  </div>
                </td>
                <td className={styles.middleTableBody}>
                  <div className={styles.fullTableWidth}>{activity.action}</div>
                </td>
                <td className={styles.middleTableBody}>
                  <div className={styles.fullTableWidth}>
                    {activity.componentType}
                  </div>
                </td>
                <td className={styles.middleTableBody}>
                  <div className={styles.fullTableWidth}>
                    {activity.newValue}
                  </div>
                </td>
                <td className={styles.locationTableBody}>
                  <div className={styles.fullTableWidth}>
                    {activity.location}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {activities.length === 0 && (
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
      )}
    </Container>
  )
}

export default ActivitiesTable

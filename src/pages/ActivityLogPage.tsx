import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import ActivitiesTable from 'components/activity-log/ActivitiesTable'

const ActivityLog: FC = () => {
  const activities = [1, 2, 3, 4]
  return (
    <Layout>
      <Container className={styles.activityLogPage}>
        <h4 className={styles.activityLogPageTitle}>Activity log</h4>
        <ActivitiesTable activities={activities} />
      </Container>
    </Layout>
  )
}

export default ActivityLog

import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import ActivitiesTable from 'components/activity-log/ActivitiesTable'

const ActivityLog: FC = () => {
  return (
    <Layout>
      <Container className={styles.activityLogPage}>
        <h4 className={styles.activityLogPageTitle}>Activity log</h4>
        <ActivitiesTable />
      </Container>
    </Layout>
  )
}

export default ActivityLog

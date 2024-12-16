import { FC, useEffect, useState } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import ActivitiesTable from 'components/activity-log/ActivitiesTable'
import * as API from 'api/Api'
import { userStorage } from 'utils/localStorage'
import { routes } from 'constants/routesConstants'
import { useNavigate } from 'react-router-dom'
import { LogType } from 'models/log'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, setError } from 'stores/errorSlice'
import { RootState } from 'stores/store'
import { ErrorType } from 'constants/errorConstants'

const ActivityLog: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAllErrors())
  }, [dispatch])

  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const token = userStorage.getToken()
  const navigate = useNavigate()
  const [logs, setLogs] = useState<LogType[]>([])

  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN)
    }
  }, [token, navigate])

  useEffect(() => {
    if (!token) return

    const fetchLogs = async () => {
      try {
        const logs = await API.getLogs(token)
        setLogs(logs)
      } catch (error) {
        dispatch(
          setError({ type: ErrorType.API, message: 'Error fetching logs' }),
        )
      }
    }
    fetchLogs()
  }, [token, dispatch])

  return (
    <Layout>
      <Container className={styles.activityLogPage}>
        <h4 className={styles.activityLogPageTitle}>Activity log</h4>
        {showApiError && <p>{apiError}</p>}
        <ActivitiesTable activities={logs} />
      </Container>
    </Layout>
  )
}

export default ActivityLog

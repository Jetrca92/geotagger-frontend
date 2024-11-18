import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import EditLocationForm from 'components/location/EditLocationForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLocation } from 'stores/userSlice'
import { RootState } from 'stores/store'
import { userStorage } from 'utils/localStorage'
import { routes } from 'constants/routesConstants'

const EditLocationPage: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useSelector((state: RootState) => selectLocation(state, id!))
  if (!location)
    return (
      <Layout>
        <Container className={styles.addLocationPage}>
          <h4 className={styles.addLocationPageTitle}>
            <span className={styles.blackText}>Edit </span>
            <span className={styles.primaryText}>location</span>
            <span className={styles.blackText}>.</span>
          </h4>
          No location data found.
        </Container>
      </Layout>
    )

  const token = userStorage.getToken()
  if (!token) {
    navigate(routes.LOGIN)
    return null
  }

  return (
    <Layout>
      <Container className={styles.addLocationPage}>
        <h4 className={styles.addLocationPageTitle}>
          <span className={styles.blackText}>Edit </span>
          <span className={styles.primaryText}>location</span>
          <span className={styles.blackText}>.</span>
        </h4>
        <EditLocationForm location={location} token={token} />
      </Container>
    </Layout>
  )
}

export default EditLocationPage

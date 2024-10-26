import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import EditLocationForm from 'components/location/EditLocationForm'

const AddLocationPage: FC = () => {
  return (
    <Layout>
      <Container className={styles.addLocationPage}>
        <h4 className={styles.addLocationPageTitle}>
          <span className={styles.blackText}>Edit </span>
          <span className={styles.primaryText}>location</span>
          <span className={styles.blackText}>.</span>
        </h4>
        <EditLocationForm />
      </Container>
    </Layout>
  )
}

export default AddLocationPage

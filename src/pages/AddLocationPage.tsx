import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/pages.module.scss'
import { Container } from 'react-bootstrap'
import AddLocationForm from 'components/location/AddLocationForm'

const AddLocationPage: FC = () => {
  return (
    <Layout>
      <Container className={styles.addLocationPage}>
        <h4 className={styles.addLocationPageTitle}>
          <span className={styles.blackText}>Add a new </span>
          <span className={styles.primaryText}>location</span>
          <span className={styles.blackText}>.</span>
        </h4>
        <AddLocationForm />
      </Container>
    </Layout>
  )
}

export default AddLocationPage

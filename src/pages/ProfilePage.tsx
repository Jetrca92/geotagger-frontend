import AvatarNameComponent from 'components/profile/AvatarNameComponent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/pages.module.scss'

const Profile: FC = () => {
  return (
    <Layout>
      <Container className={styles.profilePage}>
        <AvatarNameComponent firstName="John" lastName="Doe" />
        <Container className={styles.myBestGuessesContainer}></Container>
        <Container className={styles.myUploadsContainer}></Container>
      </Container>
    </Layout>
  )
}

export default Profile

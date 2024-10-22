import AvatarNameComponent from 'components/profile/AvatarNameComponent'
import MyBestGuessesComponent from 'components/profile/MyBestGuessesComponent'
import MyUploadsComponent from 'components/profile/MyUploadsComponent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/pages.module.scss'

const Profile: FC = () => {
  return (
    <Layout>
      <Container className={styles.profilePage}>
        <AvatarNameComponent firstName="John" lastName="Doe" />
        <MyBestGuessesComponent />
        <MyUploadsComponent />
      </Container>
    </Layout>
  )
}

export default Profile

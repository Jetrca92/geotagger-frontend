import AvatarNameComponent from 'components/profile/AvatarNameComponent'
import MyBestGuessesComponent from 'components/profile/MyBestGuessesComponent'
import MyUploadsComponent from 'components/profile/MyUploadsComponent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/pages.module.scss'

const Profile: FC = () => {
  const guess = [258, 155, 157, 100]
  return (
    <Layout>
      <Container className={styles.profilePage}>
        <AvatarNameComponent firstName="John" lastName="Doe" />
        <MyBestGuessesComponent guesses={guess} />
        <MyUploadsComponent uploads={guess} />
      </Container>
    </Layout>
  )
}

export default Profile

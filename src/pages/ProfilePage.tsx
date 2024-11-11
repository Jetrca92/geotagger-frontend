import AvatarNameComponent from 'components/profile/AvatarNameComponent'
import MyBestGuessesComponent from 'components/profile/MyBestGuessesComponent'
import MyUploadsComponent from 'components/profile/MyUploadsComponent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUser } from 'stores/authSlice'
import styles from 'styles/scss/pages.module.scss'

const Profile: FC = () => {
  const user = useSelector(selectUser)
  if (!user) {
    return (
      <Layout>
        <Container className={styles.profilePage}>
          <p>Please login to view your profile</p>
        </Container>
      </Layout>
    )
  }
  const guess = [258, 155, 157, 100]

  return (
    <Layout>
      <Container className={styles.profilePage}>
        <AvatarNameComponent
          avatarSrc={user.avatarUrl}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <MyBestGuessesComponent guesses={guess} />
        <MyUploadsComponent uploads={guess} />
      </Container>
    </Layout>
  )
}

export default Profile

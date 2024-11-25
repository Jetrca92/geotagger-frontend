import AvatarNameComponent from 'components/profile/AvatarNameComponent'
import MyBestGuessesComponent from 'components/profile/MyBestGuessesComponent'
import MyUploadsComponent from 'components/profile/MyUploadsComponent'
import Layout from 'components/ui/Layout'
import { FC, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'stores/authSlice'
import {
  selectUserGuesses,
  selectUserLocations,
  setLocations,
} from 'stores/userSlice'
import styles from 'styles/scss/pages.module.scss'
import * as API from 'api/Api'
import { userStorage } from 'utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const Profile: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = userStorage.getToken()

  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN)
      return
    }

    const fetchLocations = async () => {
      try {
        const locationsResponse = await API.getUserLocations(token)
        dispatch(setLocations(locationsResponse))
      } catch (error) {
        console.error('Failed to fetch user locations:', error)
      }
    }

    fetchLocations()
  }, [token, dispatch, navigate])

  const user = useSelector(selectUser)
  const locations = useSelector(selectUserLocations)
  const guesses = useSelector(selectUserGuesses)

  const refreshProfilePage = () => {
    window.location.reload()
  }

  if (!user) {
    return (
      <Layout>
        <Container className={styles.profilePage}>
          <p>Please login to view your profile</p>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container className={styles.profilePage}>
        <AvatarNameComponent
          avatarSrc={user.avatarUrl}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <MyBestGuessesComponent guesses={guesses} />
        <MyUploadsComponent
          uploads={locations}
          refreshProfilePage={refreshProfilePage}
        />
      </Container>
    </Layout>
  )
}

export default Profile

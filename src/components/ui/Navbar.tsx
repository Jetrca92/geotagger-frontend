import { FC, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoNavbar from 'styles/images/logo-navbar.png'
import styles from 'styles/scss/navbar.module.scss'
import PrimaryButton from './button/PrimaryButton'
import UserProfileButton from './button/UserProfileButton'
import AddButton from './button/AddButton'
import ProfileSettingsModal from 'components/modals/ProfileSettingsModal'
import { routes } from 'constants/routesConstants'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signout } from 'stores/authSlice'

const NavbarComponent: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  const handleCloseProfileSettings = () => setShowProfileSettings(false)
  const handleShowProfileSettings = () => setShowProfileSettings(true)

  const logout = () => {
    dispatch(signout())
  }

  return (
    <Container className={styles.navbarContainer}>
      <Navbar expand="lg" className={styles.customNavbar}>
        <Link to={routes.HOME}>
          <Navbar.Brand className={styles.customContainers}>
            <img src={logoNavbar} className={styles.logoImage} alt="logo" />
          </Navbar.Brand>
        </Link>
        {user ? (
          <>
            <Navbar.Toggle
              className={styles.customContainers}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end align-items-center"
            >
              <Nav className={styles.navbarUserLinks}>
                <Link to="/" className={styles.link}>
                  Home
                </Link>
                <div
                  className={styles.link}
                  onClick={handleShowProfileSettings}
                >
                  Profile settings
                </div>
                <Link to="/" className={styles.link} onClick={logout}>
                  Logout
                </Link>
                <div className={styles.navbarUserButtonsContainer}>
                  <UserProfileButton />
                  <AddButton />
                </div>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Toggle
              className={styles.customContainers}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className={styles.navbarButtonsContainer}>
                <Link to={routes.LOGIN} className={styles.signInLink}>
                  Sign in
                </Link>
                <div className={styles.orText}>or</div>
                <Link to={routes.SIGNUP}>
                  <PrimaryButton text="Sign up" />
                </Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
      <ProfileSettingsModal
        show={showProfileSettings}
        onHide={handleCloseProfileSettings}
      />
    </Container>
  )
}

export default NavbarComponent

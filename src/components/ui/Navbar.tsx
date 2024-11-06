import { FC, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoNavbar from 'styles/images/logo-navbar.png'
import styles from 'styles/scss/navbar.module.scss'
import PrimaryButton from './button/PrimaryButton'
import UserProfileButton from './button/UserProfileButton'
import AddButton from './button/AddButton'
import ProfileSettingsModal from 'components/modals/ProfileSettingsModal'
import { userStorage } from 'utils/localStorage'
import { routes } from 'constants/routesConstants'

const NavbarComponent: FC = () => {
  const user = userStorage.getUser()
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  const handleCloseProfileSettings = () => setShowProfileSettings(false)
  const handleShowProfileSettings = () => setShowProfileSettings(true)

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
                <Link to="/" className={styles.link}>
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

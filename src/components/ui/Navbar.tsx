import { FC } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoNavbar from 'styles/images/logo-navbar.png'
import styles from 'styles/scss/navbar.module.scss'
import PrimaryButton from './button/PrimaryButton'
import UserProfileButton from './button/UserProfileButton'
import AddButton from './button/AddButton'

const NavbarComponent: FC = () => {
  const user = true
  return (
    <Container className={styles.navbarContainer}>
      <Navbar expand="lg" className={styles.customNavbar}>
        <Navbar.Brand className={styles.customContainers}>
          <img src={logoNavbar} className={styles.logoImage} alt="logo" />
        </Navbar.Brand>
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
                <Link to="/" className={styles.link}>
                  Profile settings
                </Link>
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
                <Link to="/" className={styles.signInLink}>
                  Sign in
                </Link>
                <div className={styles.orText}>or</div>
                <PrimaryButton text="Sign up" />
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </Container>
  )
}

export default NavbarComponent

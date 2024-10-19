import { FC } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoNavbar from 'styles/images/logo-navbar.png'
import styles from 'styles/scss/navbar.module.scss'
import PrimaryButton from './button/PrimaryButton'

const NavbarComponent: FC = () => {
  return (
    <Navbar expand="lg" className={styles.customNavbar}>
      <Container className={styles.navbarContainer}>
        <Navbar.Brand className={styles.customContainers}>
          <img src={logoNavbar} className={styles.logoImage} alt="logo" />
        </Navbar.Brand>

        <Navbar.Toggle
          className={styles.customContainers}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className={styles.navbarButtonsContainer}>
            <Link to="/" className={styles.signInLink}>
              Sign In
            </Link>
            <div className={styles.orText}>or</div>
            <PrimaryButton text="Sign up" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent

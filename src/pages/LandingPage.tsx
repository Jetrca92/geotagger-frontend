import Footer from 'components/ui/Footer'
import LandingPageHero from 'components/ui/hero/LandingPageHero'
import NavbarComponent from 'components/ui/Navbar'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/pages.module.scss'

const Home: FC = () => {
  return (
    <>
      <NavbarComponent />
      <Container fluid className={styles.pageContainer}>
        <LandingPageHero />
      </Container>
      <Footer />
    </>
  )
}

export default Home

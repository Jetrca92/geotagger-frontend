import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/pages.module.scss'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className={styles.pagesContainer}>{children}</Container>
      <Footer />
    </>
  )
}

export default Layout

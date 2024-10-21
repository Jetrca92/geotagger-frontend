import styles from 'styles/scss/auth.module.scss'
import { FC, ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import geotaggerNavbarLogo from 'styles/images/logo-navbar.png'
import authMapImage from 'styles/images/auth-image.png'
import geotaggerRightIcon from 'styles/images/auth-geotagger-logo.png'

interface Props {
  children: ReactNode | ReactNode[]
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <Container className={styles.authPageContainer}>
      <Row className={styles.authPageRow}>
        <Col className={styles.authPageLeftCol}>
          <img
            src={geotaggerNavbarLogo}
            alt="logo"
            className={styles.authPageNavbarLogo}
          />
          {children}
        </Col>
        <Col className={styles.authPageRightCol}>
          <img src={authMapImage} alt="map" className={styles.authMapImage} />
          <img
            src={geotaggerRightIcon}
            alt="Geotagger Icon"
            className={styles.geotaggerRightIcon}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default AuthLayout

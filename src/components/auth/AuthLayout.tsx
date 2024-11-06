import styles from 'styles/scss/auth.module.scss'
import { FC, ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import geotaggerNavbarLogo from 'styles/images/logo-navbar.png'
import authMapImage from 'styles/images/auth-image.png'
import geotaggerRightIcon from 'styles/images/auth-geotagger-logo.png'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

interface Props {
  children: ReactNode | ReactNode[]
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <Container className={styles.authPageContainer}>
      <Row className={styles.authPageRow}>
        <Col className={styles.authPageLeftCol}>
          <Link to={routes.HOME}>
            <img
              src={geotaggerNavbarLogo}
              alt="logo"
              className={styles.authPageNavbarLogo}
            />
          </Link>
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

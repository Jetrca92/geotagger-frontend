import { FC } from 'react'
import styles from 'styles/scss/footer.module.scss'
import logo from 'styles/images/logo-footer.png'
import { Col, Container, Row } from 'react-bootstrap'

const Footer: FC = () => {
  return (
    <Container className={styles.footerContainer}>
      <footer className={styles.customFooter}>
        <Row className={styles.footerInner}>
          <Col xs={12} md={6} className={styles.customCol}>
            <img src={logo} className={styles.footerLeft} alt="logo" />
          </Col>
          <Col xs={12} md={6} className={styles.customCol}>
            <div className={styles.footerRight}>
              All Rights Reserved | skillupmentor.com
            </div>
          </Col>
        </Row>
      </footer>
    </Container>
  )
}

export default Footer

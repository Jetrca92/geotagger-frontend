import { FC } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'

const LocationGuessForm: FC = () => {
  return (
    <Container className={styles.locationFormContainer}>
      <Form>
        <Row className={styles.locationFormRow}>
          <Col className={styles.locationFormLeftCol}>
            <Form.Group>
              <Form.Label className={styles.labelText}>
                Guessed location
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                className={styles.formControl}
              />
            </Form.Group>
          </Col>

          <Col className={styles.locationFormRightCol}>
            <Form.Group>
              <Form.Label className={styles.labelText}>
                Error distance
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                className={styles.formControl}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className={styles.formButtonDiv}>
          <Button className={styles.formButton} type="submit">
            Guess
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default LocationGuessForm

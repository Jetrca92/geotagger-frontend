import { FC, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import mapImage from 'styles/images/map.png'
import imagePreview from 'styles/images/location1.png'
import SecondaryButton from 'components/ui/button/SecondaryButton'
import { Link } from 'react-router-dom'

const EditLocationForm: FC = () => {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <Container className={styles.addLocationFormContainer}>
      <Form className={styles.addLocationForm}>
        <div className={styles.imagePreviewDiv}>
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.imagePreview}
          />
        </div>
        <div className={styles.locationAddressText}>
          Location: Liegue St 523, Monaco
        </div>
        <Form.Group className={styles.editLocationFormActions}>
          <div>
            <Form.Label className={styles.uploadImageButtonDiv}>
              <SecondaryButton text="Upload image" />
            </Form.Label>
            <Form.Control type="file" name="image" />
          </div>
          <div className={styles.actionsRight}>
            <div className={styles.formButtonDiv}>
              <Button className={styles.formButton} type="submit">
                Save
              </Button>
            </div>
            <Link to="/" className={styles.signInLink}>
              Cancel
            </Link>
          </div>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default EditLocationForm

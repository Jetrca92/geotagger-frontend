import { FC, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import mapImage from 'styles/images/map.png'
import noLocation from 'styles/images/no-location-image.png'
import SecondaryButton from 'components/ui/button/SecondaryButton'

const AddLocationForm: FC = () => {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <Container className={styles.addLocationFormContainer}>
      <Form className={styles.addLocationForm}>
        {preview ? (
          <img src={preview} alt="Preview" className={styles.imagePreview} />
        ) : (
          <img
            src={noLocation}
            alt="Location"
            className={styles.imagePreview}
          />
        )}
        <Form.Group>
          <Form.Label className={styles.uploadImageButtonDiv}>
            <SecondaryButton text="Upload image" />
          </Form.Label>
          <Form.Control type="file" name="image" />
        </Form.Group>

        <img src={mapImage} alt="map" className={styles.mapImage} />

        <Form.Group>
          <Form.Label className={styles.locationInputLabel}>
            Location
          </Form.Label>
          <Form.Control
            type="text"
            name="location"
            className={styles.locationInput}
          />
        </Form.Group>

        <div className={styles.formButtonDiv}>
          <Button className={styles.formButton} type="submit">
            Add new
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default AddLocationForm

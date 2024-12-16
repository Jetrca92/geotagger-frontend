import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import editImage from 'styles/icons/edit-icon.png'

interface Props {
  disabled?: boolean
}

const EditButton: FC<Props> = ({ disabled = false }) => {
  return (
    <Button className={styles.customEditButton} disabled={disabled}>
      <img src={editImage} className={styles.editIcon} alt="edit" />
    </Button>
  )
}

export default EditButton

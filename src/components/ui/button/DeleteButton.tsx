import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import deleteImage from 'styles/icons/delete-icon.png'

interface Props {
  disabled?: boolean
}

const DeleteButton: FC<Props> = ({ disabled = false }) => {
  return (
    <Button className={styles.customDeleteButton} disabled={disabled}>
      <img src={deleteImage} className={styles.deleteIcon} alt="delete" />
    </Button>
  )
}

export default DeleteButton

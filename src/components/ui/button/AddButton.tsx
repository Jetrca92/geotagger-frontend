import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import addImage from 'styles/icons/add-icon.png'

interface Props {
  disabled?: boolean
}

const AddButton: FC<Props> = ({ disabled = false }) => {
  return (
    <Button className={styles.customAddButton} disabled={disabled}>
      <img src={addImage} className={styles.addIcon} alt="add" />
    </Button>
  )
}

export default AddButton

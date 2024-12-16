import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'

interface Props {
  text: string
  disabled?: boolean
}

const SecondaryButton: FC<Props> = ({ text, disabled = false }) => {
  return (
    <Button className={styles.customSecondaryButton} disabled={disabled}>
      {text}
    </Button>
  )
}

export default SecondaryButton

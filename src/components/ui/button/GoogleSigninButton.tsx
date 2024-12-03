import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import googleIcon from 'styles/icons/google-icon.png'

interface Props {
  text: string
  disabled?: boolean
}

const GoogleSigninButton: FC<Props> = ({ text, disabled = false }) => {
  return (
    <Button className={styles.customGoogleSigninButton} disabled={disabled}>
      <img src={googleIcon} alt="google icon" className={styles.googleIcon} />
      {text}
    </Button>
  )
}

export default GoogleSigninButton

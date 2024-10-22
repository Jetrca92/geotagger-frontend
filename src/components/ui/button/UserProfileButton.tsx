import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import EmptyAvatarSm from '../icons/EmptyAvatarSm'

interface Props {
  points?: number
}

const UserProfileButton: FC<Props> = ({ points }) => {
  if (points) {
    return (
      <Button className={styles.customUserProfileButtonWithPoints}>
        <EmptyAvatarSm />
        <span className={styles.customUserProfilePoints}>{points}</span>
      </Button>
    )
  }
  return (
    <Button className={styles.customUserProfileButton}>
      <EmptyAvatarSm />
    </Button>
  )
}

export default UserProfileButton

import { FC } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles/scss/custom-bootstrap.module.scss'
import UserAvatar from '../icons/UserAvatar'

interface UserProfileButtonProps {
  avatarSrc?: string
  points?: number
}

const UserProfileButton: FC<UserProfileButtonProps> = ({
  avatarSrc,
  points = 0,
}) => {
  return (
    <Button
      className={
        points > 0
          ? styles.customUserProfileButtonWithPoints
          : styles.customUserProfileButton
      }
    >
      <div className={styles.customUserProfileAvatarDiv}>
        <UserAvatar avatarSrc={avatarSrc} />
      </div>

      {points > 0 && (
        <span className={styles.customUserProfilePoints}>{points}</span>
      )}
    </Button>
  )
}

export default UserProfileButton

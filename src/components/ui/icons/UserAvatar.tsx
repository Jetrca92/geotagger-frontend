import { FC } from 'react'
import styles from 'styles/scss/auth.module.scss'
import personIcon from 'styles/icons/person.png'

interface UserAvatarProps {
  avatarSrc?: string
}

const UserAvatar: FC<UserAvatarProps> = ({ avatarSrc }) => {
  return (
    <div className={avatarSrc ? styles.userAvatar : styles.emptyAvatar}>
      <img
        src={avatarSrc || personIcon}
        alt={avatarSrc ? 'User avatar' : 'Default avatar icon'}
        className={avatarSrc ? styles.userAvatarImage : styles.emptyAvatarIcon}
      />
    </div>
  )
}

export default UserAvatar

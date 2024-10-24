import { FC } from 'react'
import styles from 'styles/scss/auth.module.scss'
import personIcon from 'styles/icons/person.png'

interface Props {
  avatarSrc?: string
}

const UserAvatar: FC<Props> = ({ avatarSrc }) => {
  if (avatarSrc)
    return (
      <div className={styles.userAvatar}>
        <img src={avatarSrc} alt="person" className={styles.userAvatarImage} />
      </div>
    )

  return (
    <div className={styles.emptyAvatar}>
      <img src={personIcon} alt="person" className={styles.emptyAvatarIcon} />
    </div>
  )
}

export default UserAvatar

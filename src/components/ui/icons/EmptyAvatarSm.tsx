import { FC } from 'react'
import styles from 'styles/scss/auth.module.scss'
import personIcon from 'styles/icons/person.png'

const EmptyAvatarSm: FC = () => {
  return (
    <div className={styles.emptyAvatarSm}>
      <img src={personIcon} alt="person" className={styles.emptyAvatarIcon} />
    </div>
  )
}

export default EmptyAvatarSm

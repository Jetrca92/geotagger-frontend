import UserAvatar from 'components/ui/icons/UserAvatar'
import { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from 'styles/scss/profile.module.scss'

interface Props {
  avatarSrc?: string
  firstName: string
  lastName: string
}

const AvatarNameComponent: FC<Props> = ({ avatarSrc, firstName, lastName }) => {
  return (
    <Container className={styles.userAvatarNameContainer}>
      <div className={styles.userAvatarDiv}>
        <UserAvatar avatarSrc={avatarSrc} />
      </div>
      <h4
        className={styles.userAvatarNameText}
      >{`${firstName} ${lastName}`}</h4>
    </Container>
  )
}

export default AvatarNameComponent

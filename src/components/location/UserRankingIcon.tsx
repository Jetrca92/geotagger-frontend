import { FC } from 'react'
import styles from 'styles/scss/location.module.scss'

interface Props {
  ranking: number
}

const UserRankingIcon: FC<Props> = ({ ranking }) => {
  let rankingClass

  switch (ranking) {
    case 1:
      rankingClass = 'First'
      break
    case 2:
      rankingClass = 'Second'
      break
    case 3:
      rankingClass = 'Third'
      break
    default:
      rankingClass = 'NonPodium'
  }
  return (
    <div className={styles[`userRankingIconDiv${rankingClass}`]}>
      <div className={styles.userRankingIconNumber}>{ranking}</div>
    </div>
  )
}

export default UserRankingIcon

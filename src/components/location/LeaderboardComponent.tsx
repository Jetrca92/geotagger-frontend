import UserAvatar from 'components/ui/icons/UserAvatar'
import { FC } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import sampleAvatar from 'styles/images/sample-avatar.png'
import UserRankingIcon from './UserRankingIcon'

interface Props {
  location: number
}

const LeaderboardComponent: FC<Props> = ({ location }) => {
  return (
    <Container className={styles.leaderboardContainer}>
      <h4 className={styles.takeGuessTitle}>Leaderboard</h4>
      <ListGroup className={styles.leaderboardList}>
        <ListGroup.Item className={styles.leaderboardListItem}>
          <div className={styles.leaderboardUserDetailsDiv}>
            <UserRankingIcon ranking={4} />

            <div className={styles.leaderboardUserDetails}>
              <div className={styles.leaderboardUserAvatar}>
                <UserAvatar avatarSrc={sampleAvatar} />
              </div>
              <div className={styles.userNameSurnameDate}>
                <div className={styles.userNameSurname}>Elanor Pera</div>
                <div className={styles.userGuessDate}>23. 4. 2021</div>
              </div>
            </div>
          </div>
          <div className={styles.guessDistance}>6 m</div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default LeaderboardComponent

import UserAvatar from 'components/ui/icons/UserAvatar'
import { FC } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import styles from 'styles/scss/location.module.scss'
import sampleAvatar from 'styles/images/sample-avatar.png'
import UserRankingIcon from './UserRankingIcon'
import { GuessType } from 'models/guess'
import { errorDistanceString, formatDate } from 'utils/helpers'

interface Props {
  guesses: GuessType[]
}

const LeaderboardComponent: FC<Props> = ({ guesses = [] }) => {
  if (guesses.length === 0)
    return (
      <Container className={styles.leaderboardContainer}>
        <h4 className={styles.takeGuessTitle}>Leaderboard</h4>
        No guesses.
      </Container>
    )

  return (
    <Container className={styles.leaderboardContainer}>
      <h4 className={styles.takeGuessTitle}>Leaderboard</h4>
      <ListGroup className={styles.leaderboardList}>
        {guesses.map((guess, index) => (
          <ListGroup.Item className={styles.leaderboardListItem} key={guess.id}>
            <div className={styles.leaderboardUserDetailsDiv}>
              <UserRankingIcon ranking={index + 1} />

              <div className={styles.leaderboardUserDetails}>
                <div className={styles.leaderboardUserAvatar}>
                  <UserAvatar
                    avatarSrc={
                      guess.owner.avatarUrl
                        ? guess?.owner?.avatarUrl
                        : sampleAvatar
                    }
                  />
                </div>
                <div className={styles.userNameSurnameDate}>
                  <div
                    className={styles.userNameSurname}
                  >{`${guess.owner.firstName} ${guess.owner.lastName}`}</div>
                  <div className={styles.userGuessDate}>
                    {formatDate(guess.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.guessDistance}>
              {errorDistanceString(guess.errorDistance)}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default LeaderboardComponent

import { FC } from 'react'
import { observer } from 'mobx-react'

import Profile from 'pages/ProfilePage'

const App: FC = () => {
  return <Profile />
}

export default observer(App)

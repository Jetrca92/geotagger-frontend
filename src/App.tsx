import { FC } from 'react'
import { observer } from 'mobx-react'

import Profile from 'pages/ProfilePage'
import LandingPage from 'pages/LandingPage'

const App: FC = () => {
  return <LandingPage />
}

export default observer(App)

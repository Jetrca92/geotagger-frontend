import { FC } from 'react'
import { observer } from 'mobx-react'

import LocationPage from 'pages/LocationGuess'

const App: FC = () => {
  return <LocationPage />
}

export default observer(App)

import { FC } from 'react'
import { observer } from 'mobx-react'

import AddLocationPage from 'pages/AddLocationPage'

const App: FC = () => {
  return <AddLocationPage />
}

export default observer(App)

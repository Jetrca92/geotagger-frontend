import { FC } from 'react'
import { observer } from 'mobx-react'

import EditLocationPage from 'pages/EditLocationPage'

const App: FC = () => {
  return <EditLocationPage />
}

export default observer(App)

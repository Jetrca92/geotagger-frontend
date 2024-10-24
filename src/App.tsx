import { FC } from 'react'
import { observer } from 'mobx-react'

import ActivityLog from 'pages/ActivityLogPage'

const App: FC = () => {
  return <ActivityLog />
}

export default observer(App)

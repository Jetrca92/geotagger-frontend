import { FC } from 'react'
import { observer } from 'mobx-react'
import Routes from 'routes/Routes'

const App: FC = () => {
  return <Routes />
}

export default observer(App)

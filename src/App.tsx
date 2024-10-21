import { FC } from 'react'
import { observer } from 'mobx-react'

import Login from 'pages/LoginPage'

const App: FC = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default observer(App)

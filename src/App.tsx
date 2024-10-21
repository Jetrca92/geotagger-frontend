import { FC } from 'react'
import { observer } from 'mobx-react'

import Signup from 'pages/SignupPage'

const App: FC = () => {
  return (
    <>
      <Signup />
    </>
  )
}

export default observer(App)

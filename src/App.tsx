import { FC } from 'react'
import { observer } from 'mobx-react'

import Home from 'pages/LandingPage'

const App: FC = () => {
  const buttonProps = 'Button CTA'
  return (
    <>
      <Home />
    </>
  )
}

export default observer(App)

import { FC } from 'react'
import { observer } from 'mobx-react'

import NavbarComponent from 'components/ui/Navbar'

const App: FC = () => {
  return <NavbarComponent />
}

export default observer(App)

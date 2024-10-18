import { FC } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'react-bootstrap'

const App: FC = () => {
  return (
    <>
      <h1>heading 1</h1>
      <h2>heading 2</h2>
      <p>this is a paragraph</p>
      <h3>heading 3</h3>
    </>
  )
}

export default observer(App)

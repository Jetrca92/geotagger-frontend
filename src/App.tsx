import { FC } from 'react'
import { observer } from 'mobx-react'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import SecondaryButton from 'components/ui/button/SecondaryButton'
import EditButton from 'components/ui/button/EditButton'

const App: FC = () => {
  const buttonProps = 'Button CTA'
  return (
    <>
      <h1>heading 1</h1>
      <h2>heading 2</h2>
      <p>this is a paragraph</p>
      <h3>heading 3</h3>
      <PrimaryButton text={buttonProps} />
      <PrimaryButton text={buttonProps} disabled={true} />
      <SecondaryButton text={buttonProps} />
      <SecondaryButton text={buttonProps} disabled={true} />
      <EditButton />
      <EditButton disabled={true} />
    </>
  )
}

export default observer(App)

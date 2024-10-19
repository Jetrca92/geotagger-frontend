import { FC } from 'react'
import { observer } from 'mobx-react'
import PrimaryButton from 'components/ui/button/PrimaryButton'
import SecondaryButton from 'components/ui/button/SecondaryButton'
import EditButton from 'components/ui/button/EditButton'
import Footer from 'components/ui/Footer'

const App: FC = () => {
  const buttonProps = 'Button CTA'
  return (
    <>
      <Footer />
    </>
  )
}

export default observer(App)

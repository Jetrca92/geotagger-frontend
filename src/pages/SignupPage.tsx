import { FC } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import SignupForm from 'components/auth/SignupForm'

const Signup: FC = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}

export default Signup

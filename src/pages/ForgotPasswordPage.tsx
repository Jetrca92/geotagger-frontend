import { FC } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import ForgotPasswordForm from 'components/auth/ForgotPasswordForm'

const ForgotPasswordPage: FC = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

export default ForgotPasswordPage

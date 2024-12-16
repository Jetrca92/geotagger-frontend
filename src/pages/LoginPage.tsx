import { FC } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import LoginForm from 'components/auth/LoginForm'

const Login: FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default Login

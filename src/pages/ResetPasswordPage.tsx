import { FC } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import ResetPasswordForm from 'components/auth/ResetPasswordForm'
import { useLocation } from 'react-router-dom'

const ResetPasswordPage: FC = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const token = params.get('token')

  if (!token) return <div>Invalid token.</div>

  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  )
}

export default ResetPasswordPage

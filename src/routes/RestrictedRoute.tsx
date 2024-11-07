import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from 'stores/authSlice'

interface RestrictedRouteProps {
  children: ReactNode
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children }) => {
  const user = useSelector(selectUser)
  if (user) {
    return <Navigate to="/" />
  }
  return children ? (children as JSX.Element) : null
}

export default RestrictedRoute

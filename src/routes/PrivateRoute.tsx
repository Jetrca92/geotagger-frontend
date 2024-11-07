import { FC } from 'react'
import { Navigate, RouteProps, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from 'stores/authSlice'

const PrivateRoute: FC<RouteProps> = ({ children }: RouteProps) => {
  const location = useLocation()
  const user = useSelector(selectUser)

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    )
  }

  return children as JSX.Element
}

export default PrivateRoute

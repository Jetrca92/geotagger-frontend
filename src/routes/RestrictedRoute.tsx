import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from 'stores/authSlice'

interface RestrictedRouteProps {
  children: ReactNode
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children }) => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return user ? null : children ? (children as JSX.Element) : null
}

export default RestrictedRoute

import authStore from 'stores/auth.store'
import { observer } from 'mobx-react'
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface RestrictedRouteProps {
  children: ReactNode
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children }) => {
  if (authStore.user) {
    return <Navigate to="/" />
  }
  return children ? (children as JSX.Element) : null
}

export default observer(RestrictedRoute)

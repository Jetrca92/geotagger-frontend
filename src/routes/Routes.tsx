import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'
import { routes } from 'constants/routesConstants'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType
}

/* Public routes */
const Landing = lazy(() => import('pages/LandingPage'))

/* Private routes */
const Profile = lazy(() => import('pages/ProfilePage'))
const AddLocation = lazy(() => import('pages/AddLocationPage'))
const EditLocation = lazy(() => import('pages/EditLocationPage'))

/* Restricted routes */
const Login = lazy(() => import('pages/LoginPage'))
const Register = lazy(() => import('pages/SignupPage'))
const ForgotPassword = lazy(() => import('pages/ForgotPasswordPage'))

/* Error routes */
const Page404 = lazy(() => import('pages/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    path: routes.LOGIN,
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: routes.SIGNUP,
    children: <Register />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: routes.HOME,
    children: <Landing />,
  },
  {
    type: RouteType.PUBLIC,
    path: routes.FORGOT_PASSWORD,
    children: <ForgotPassword />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: routes.PROFILE,
    children: <Profile />,
  },
  {
    type: RouteType.PRIVATE,
    path: routes.ADD_LOCATION,
    children: <AddLocation />,
  },
  {
    type: RouteType.PRIVATE,
    path: `${routes.LOCATION_PREFIX}/:id`,
    children: <EditLocation />,
  },
]

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            )
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            )
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          )
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default Routes

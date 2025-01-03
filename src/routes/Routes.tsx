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
const Dashboard = lazy(() => import('pages/Dashboard'))
const ForgotPassword = lazy(() => import('pages/ForgotPasswordPage'))
const ResetPassword = lazy(() => import('pages/ResetPasswordPage'))

/* Private routes */
const Profile = lazy(() => import('pages/ProfilePage'))
const AddLocation = lazy(() => import('pages/AddLocationPage'))
const EditLocation = lazy(() => import('pages/EditLocationPage'))
const GuessLocation = lazy(() => import('pages/LocationGuess'))
const ActivityLog = lazy(() => import('pages/ActivityLogPage'))

/* Restricted routes */
const Login = lazy(() => import('pages/LoginPage'))
const Register = lazy(() => import('pages/SignupPage'))

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
  {
    type: RouteType.PUBLIC,
    path: routes.RESET_PASSWORD,
    children: <ResetPassword />,
  },
  {
    type: RouteType.PUBLIC,
    path: routes.DASHBOARD,
    children: <Dashboard />,
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
    path: `${routes.EDIT_LOCATION_PREFIX}/:id`,
    children: <EditLocation />,
  },
  {
    type: RouteType.PRIVATE,
    path: `${routes.LOCATION_PREFIX}/:id`,
    children: <GuessLocation />,
  },
  {
    type: RouteType.PRIVATE,
    path: routes.LOGS,
    children: <ActivityLog />,
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

import Layout from 'components/ui/Layout'
import { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStorage } from 'utils/localStorage'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import * as API from 'api/Api'
import { login } from 'stores/authSlice'
import { setGuesses, setLocations } from 'stores/userSlice'
import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import { RootState } from 'stores/store'

const Dashboard: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { apiError, showApiError } = useSelector(
    (state: RootState) => state.error,
  )

  const fetchAndSetUserData = useCallback(
    async (token: string) => {
      try {
        const [user, userLocations, userGuesses] = await Promise.all([
          API.fetchUser(token),
          API.getUserLocations(token),
          API.getUserGuesses(token),
        ])

        dispatch(login({ user, token }))
        dispatch(setLocations(userLocations))
        dispatch(setGuesses(userGuesses))
        userStorage.setToken(token) // Persist token only after success
        navigate(routes.HOME)
      } catch (error) {
        dispatch(
          setError({
            type: ErrorType.API,
            message: 'Failed to fetch user information.',
          }),
        )
      }
    },
    [dispatch, navigate],
  )
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')

    if (token) {
      fetchAndSetUserData(token)
    } else if (!userStorage.getToken()) {
      navigate(routes.LOGIN)
    }
  }, [fetchAndSetUserData, location.search, navigate])

  return <Layout>{showApiError && <div>{apiError}</div>}</Layout>
}

export default Dashboard

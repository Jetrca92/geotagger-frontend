import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UserType } from 'models/auth'
import { ApiRegisterUser } from 'hooks/react-hook-form/useRegister'
import { AxiosHeaders, AxiosRequestHeaders } from 'axios'
import { ChangePasswordFormFields } from 'hooks/react-hook-form/useChangePassword'

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, void>('post', apiRoutes.LOGIN, data)

export const signup = async (data: ApiRegisterUser) =>
  apiRequest<ApiRegisterUser, void>('post', apiRoutes.SIGNUP, data)

export const fetchUser = async (token: string) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<void, UserType>(
    'get',
    apiRoutes.FETCH_USER,
    undefined,
    {
      headers: headers,
    },
  )
  return response.data // Adjust based on the expected response format
}

export const updatePassword = async (
  data: ChangePasswordFormFields,
  token: string,
) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<ChangePasswordFormFields, void>(
    'patch',
    apiRoutes.UPDATE_PASSWORD,
    data,
    {
      headers: headers,
    },
  )
  return response.data
}

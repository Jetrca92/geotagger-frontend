import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { ApiRegisterUser } from 'hooks/react-hook-form/useRegister'

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, void>(apiMethods.POST, apiRoutes.LOGIN, data)

export const signup = async (data: ApiRegisterUser) =>
  apiRequest<ApiRegisterUser, void>(apiMethods.POST, apiRoutes.SIGNUP, data)

import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequest, apiRequestWithAuthHeaders } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { ApiRegisterUser } from 'hooks/react-hook-form/useRegister'
import { ForgotPasswordFormFields } from 'hooks/react-hook-form/useForgotPasswordForm'
import { ApiResetPasswordFormFields } from 'hooks/react-hook-form/useResetPasswordForm'

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, void>(apiMethods.POST, apiRoutes.LOGIN, data)

export const signup = async (data: ApiRegisterUser) =>
  apiRequest<ApiRegisterUser, void>(apiMethods.POST, apiRoutes.SIGNUP, data)

export const forgotPassword = async (data: ForgotPasswordFormFields) =>
  apiRequest<ForgotPasswordFormFields, void>(
    apiMethods.POST,
    apiRoutes.FORGOT_PASSWORD,
    data,
  )

export const resetPassword = async (
  token: string,
  data: ApiResetPasswordFormFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    ApiResetPasswordFormFields,
    void
  >(apiMethods.PATCH, apiRoutes.RESET_PASSWORD, token, data)
  return response.data
}

export const getGoogleUser = async (token: string) =>
  apiRequest<void, { user: any }>(
    apiMethods.GET,
    `${apiRoutes.GOOGLE_LOGIN}?token=${token}`,
  )

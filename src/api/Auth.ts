import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequest, apiRequestWithAuthHeaders } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { ApiRegisterUser } from 'hooks/react-hook-form/useRegister'
import { ForgotPasswordFormFields } from 'hooks/react-hook-form/useForgotPasswordForm'
import { ApiResetPasswordFormFields } from 'hooks/react-hook-form/useResetPasswordForm'
import { Dispatch } from '@reduxjs/toolkit'
import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import { routes } from 'constants/routesConstants'

export const login = async (data: LoginUserFields, dispatch: Dispatch) => {
  const response = await apiRequest<LoginUserFields, void>(
    apiMethods.POST,
    apiRoutes.LOGIN,
    data,
  )
  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.API, message: response.data.message }))
    return
  }
  return response
}

export const signup = async (data: ApiRegisterUser, dispatch: Dispatch) => {
  const response = await apiRequest<ApiRegisterUser, void>(
    apiMethods.POST,
    apiRoutes.SIGNUP,
    data,
  )
  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.API, message: response.data.message }))
    return
  }
  return response
}

export const forgotPassword = async (
  data: ForgotPasswordFormFields,
  dispatch: Dispatch,
  navigate: (path: string) => void,
): Promise<void> => {
  const response = await apiRequest<ForgotPasswordFormFields, void>(
    apiMethods.POST,
    apiRoutes.FORGOT_PASSWORD,
    data,
  )

  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.API, message: response.data.message }))
    return
  }

  navigate(routes.HOME)
}

export const resetPassword = async (
  token: string,
  data: ApiResetPasswordFormFields,
  dispatch: Dispatch,
) => {
  const response = await apiRequestWithAuthHeaders<
    ApiResetPasswordFormFields,
    void
  >(apiMethods.PATCH, apiRoutes.RESET_PASSWORD, token, data)
  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.API, message: response.data.message }))
    return
  }
  return response.data
}

export const getGoogleUser = async (token: string) =>
  apiRequest<void, { user: any }>(
    apiMethods.GET,
    `${apiRoutes.GOOGLE_LOGIN}?token=${token}`,
  )

import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequest, apiRequestWithAuthHeaders } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UserType } from 'models/auth'
import { ApiRegisterUser } from 'hooks/react-hook-form/useRegister'
import { ChangePasswordFormFields } from 'hooks/react-hook-form/useChangePassword'

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, void>(apiMethods.POST, apiRoutes.LOGIN, data)

export const signup = async (data: ApiRegisterUser) =>
  apiRequest<ApiRegisterUser, void>(apiMethods.POST, apiRoutes.SIGNUP, data)

export const fetchUser = async (token: string) => {
  const response = await apiRequestWithAuthHeaders<void, UserType>(
    apiMethods.GET,
    apiRoutes.FETCH_USER,
    token,
  )
  return response.data
}

export const updatePassword = async (
  token: string,
  data: ChangePasswordFormFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    ChangePasswordFormFields,
    void
  >(apiMethods.PATCH, apiRoutes.UPDATE_PASSWORD, token, data)
  return response.data
}

export const uploadImage = async (
  token: string,
  data: FormData,
  id: string,
) => {
  const response = await apiRequestWithAuthHeaders<FormData, UserType>(
    apiMethods.POST,
    `${apiRoutes.UPLOAD_USER_IMAGE_PREFIX}/${id}`,
    token,
    data,
  )
  return response.data
}

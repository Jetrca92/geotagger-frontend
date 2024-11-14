import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequestWithAuthHeaders } from './Api'
import { UserType } from 'models/auth'
import { ChangePasswordFormFields } from 'hooks/react-hook-form/useChangePassword'
import { ProfileSettingsFields } from 'hooks/react-hook-form/useProfileSettingsForm'
import { ApiProfileSettingsPasswordFields } from 'hooks/react-hook-form/useProfileSettingsPasswordForm'

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

export const updateUser = async (
  token: string,
  data: ProfileSettingsFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    ProfileSettingsFields,
    UserType
  >(apiMethods.PATCH, apiRoutes.UPDATE_USER, token, data)
  return response.data
}

export const updateUserPassword = async (
  token: string,
  data: ApiProfileSettingsPasswordFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    ApiProfileSettingsPasswordFields,
    UserType
  >(apiMethods.PATCH, apiRoutes.UPDATE_PASSWORD, token, data)
  return response.data
}

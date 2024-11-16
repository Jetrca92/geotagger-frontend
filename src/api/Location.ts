import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequest, apiRequestWithAuthHeaders } from './Api'
import { LocationType } from 'models/location'
import { AddLocationFields } from 'hooks/react-hook-form/useAddLocationForm'

export const getLocations = async () => {
  const response = await apiRequest<void, LocationType[]>(
    apiMethods.GET,
    apiRoutes.LOCATION_PREFIX,
  )
  return response.data
}

export const getRandomLocation = async () => {
  const response = await apiRequest<void, LocationType>(
    apiMethods.GET,
    apiRoutes.RANDOM_LOCATION,
  )
  return response.data
}

export const getUserLocations = async (token: string) => {
  const response = await apiRequestWithAuthHeaders<void, LocationType[]>(
    apiMethods.GET,
    apiRoutes.LOCATION_PREFIX,
    token,
  )
  return response.data
}

export const addLocation = async (token: string, data: AddLocationFields) => {
  const response = await apiRequestWithAuthHeaders<
    AddLocationFields,
    LocationType
  >(apiMethods.POST, apiRoutes.LOCATION_PREFIX, token, data)
  return response.data
}

export const updateLocation = async (
  token: string,
  data: AddLocationFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    AddLocationFields,
    LocationType
  >(apiMethods.PATCH, apiRoutes.LOCATION_PREFIX, token, data)
  return response.data
}

export const uploadLocationImage = async (
  token: string,
  data: FormData,
  id: string,
) => {
  const response = await apiRequestWithAuthHeaders<FormData, LocationType>(
    apiMethods.POST,
    `${apiRoutes.UPLOAD_LOCATION_IMAGE_PREFIX}/${id}`,
    token,
    data,
  )
  return response.data
}

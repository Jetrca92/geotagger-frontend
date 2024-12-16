import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { apiRequest, apiRequestWithAuthHeaders } from './Api'
import { LocationType } from 'models/location'
import { AddLocationFields } from 'hooks/react-hook-form/useAddLocationForm'
import { Dispatch } from '@reduxjs/toolkit'
import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'

export const getLocations = async () => {
  const response = await apiRequest<void, LocationType[]>(
    apiMethods.GET,
    apiRoutes.LOCATION_PREFIX,
  )
  return response.data
}

export const getLocationById = async (id: string) => {
  const response = await apiRequest<void, LocationType>(
    apiMethods.GET,
    `${apiRoutes.LOCATION_BY_ID_PREFIX}/${id}`,
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
    apiRoutes.FETCH_USER_LOCATIONS,
    token,
  )
  return response.data
}

export const addLocation = async (
  token: string,
  data: AddLocationFields,
  dispatch: Dispatch,
) => {
  const response = await apiRequestWithAuthHeaders<
    AddLocationFields,
    LocationType
  >(apiMethods.POST, apiRoutes.LOCATION_PREFIX, token, data)
  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.API, message: response.data.message }))
    return
  }
  return response.data
}

export const updateLocation = async (
  token: string,
  id: string,
  data: AddLocationFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    AddLocationFields,
    LocationType
  >(apiMethods.PATCH, `${apiRoutes.LOCATION_BY_ID_PREFIX}/${id}`, token, data)
  return response.data
}

export const uploadLocationImage = async (
  token: string,
  data: FormData,
  id: string,
  dispatch: Dispatch,
) => {
  const response = await apiRequestWithAuthHeaders<FormData, LocationType>(
    apiMethods.POST,
    `${apiRoutes.UPLOAD_LOCATION_IMAGE_PREFIX}/${id}`,
    token,
    data,
  )
  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.FILE, message: response.data.message }))
    return
  }
  return response.data
}

export const deleteLocation = async (
  token: string,
  id: string,
  dispatch: Dispatch,
) => {
  const response = await apiRequestWithAuthHeaders<void, LocationType>(
    apiMethods.DELETE,
    `${apiRoutes.LOCATION_BY_ID_PREFIX}/${id}`,
    token,
  )
  if (response.data?.statusCode) {
    dispatch(setError({ type: ErrorType.API, message: response.data.message }))
    return
  }
  return response.data
}

import { AddLocationFields } from 'hooks/react-hook-form/useAddLocationForm'
import { apiRequestWithAuthHeaders } from './Api'
import { LocationType } from 'models/location'
import { apiMethods, apiRoutes } from 'constants/apiConstants'

export const addGuess = async (
  token: string,
  id: string,
  data: AddLocationFields,
) => {
  const response = await apiRequestWithAuthHeaders<
    AddLocationFields,
    LocationType
  >(apiMethods.POST, `${apiRoutes.GUESS_LOCATION_PREFIX}/${id}`, token, data)
  return response.data
}

export const getGuesses = async (token: string, id: string) => {
  const response = await apiRequestWithAuthHeaders<void, LocationType[]>(
    apiMethods.GET,
    `${apiRoutes.GUESS_LOCATION_PREFIX}/${id}`,
    token,
  )
  return response.data
}

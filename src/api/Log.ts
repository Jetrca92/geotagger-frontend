import { apiRequestWithAuthHeaders } from './Api'
import { apiMethods, apiRoutes } from 'constants/apiConstants'
import { LogType } from 'models/log'

interface AddLogFields {
  action: string
  componentType?: string
  newValue?: string
  location: string
}
export const logUserAction = async (token: string, data: AddLogFields) => {
  const response = await apiRequestWithAuthHeaders<AddLogFields, LogType>(
    apiMethods.POST,
    apiRoutes.LOG_PREFIX,
    token,
    data,
  )
  return response.data
}

export const getLogs = async (token: string) => {
  const response = await apiRequestWithAuthHeaders<void, LogType[]>(
    apiMethods.GET,
    apiRoutes.LOG_PREFIX,
    token,
  )
  return response.data
}

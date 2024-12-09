import Axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'
import { apiMethods } from 'constants/apiConstants'

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method:
    | apiMethods.GET
    | apiMethods.DELETE
    | apiMethods.HEAD
    | apiMethods.OPTIONS
    | apiMethods.POST
    | apiMethods.PUT
    | apiMethods.PATCH,
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders
  } & AxiosRequestConfig,
) {
  try {
    const response = await Axios.request<R>({
      baseURL: process.env.REACT_APP_API_URL,
      url: path,
      method: method,
      data: input,
      headers: options?.headers,
      withCredentials: true,
    })
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response
  }
}

export async function apiRequestWithAuthHeaders<
  D = Record<string, unknown>,
  R = unknown,
>(
  method:
    | apiMethods.GET
    | apiMethods.DELETE
    | apiMethods.HEAD
    | apiMethods.OPTIONS
    | apiMethods.POST
    | apiMethods.PUT
    | apiMethods.PATCH,
  path: string,
  token: string,
  input?: D,
  options?: AxiosRequestConfig,
) {
  const headers = new AxiosHeaders()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.set(key, value as string)
    })
  }

  return apiRequest(method, path, input, {
    ...options,
    headers: headers,
  })
}

export * from './Auth'
export * from './User'
export * from './Location'
export * from './Guess'
export * from './Log'

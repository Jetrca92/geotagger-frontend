export enum apiRoutes {
  // Auth
  LOGIN = '/auth/login',
  SIGNUP = '/auth/register',
  GOOGLE_LOGIN = '/auth/google/login',
  GOOGLE_CALLBACK = '/auth/google/callback',
  FORGOT_PASSWORD = '/auth/forgot-password',
  // User
  FETCH_USER = '/user',
  UPLOAD_USER_IMAGE_PREFIX = '/user/upload',
  UPDATE_USER = 'user/update-user',
  UPDATE_PASSWORD = '/user/update-password',
  // Location
  LOCATION_PREFIX = '/location',
  RANDOM_LOCATION = '/location/random,',
  UPLOAD_LOCATION_IMAGE_PREFIX = '/location/upload',
  GUESS_LOCATION_PREFIX = '/location/guess',
}

export enum apiMethods {
  GET = 'get',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

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
  FETCH_USER_LOCATIONS = '/location/user-locations',
  RANDOM_LOCATION = '/location/random,',
  UPLOAD_LOCATION_IMAGE_PREFIX = '/location/upload',
  LOCATION_BY_ID_PREFIX = 'location/location',
  // Guess
  GUESS_LOCATION_PREFIX = '/location/guess',
  USER_GUESSES = 'location/guess/user-guesses',
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

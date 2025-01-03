import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import { AppDispatch } from 'stores/store'
import * as API from 'api/Api'
export const isValidFile = (file: File | null, dispatch: AppDispatch) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!file) return false
  if (!allowedTypes.includes(file.type)) {
    dispatch(
      setError({
        type: ErrorType.FILE,
        message: 'Invalid file type. Must be jpeg, png or gif',
      }),
    )
    return false
  }
  return true
}

export const uploadUserAvatar = async (
  token: string,
  userId: string,
  file: File,
  dispatch: AppDispatch,
) => {
  try {
    const formData = new FormData()
    formData.append('image', file as File, file?.name)
    const imageResponse = await API.uploadImage(
      token,
      formData,
      userId,
      dispatch,
    )
    if (!imageResponse) return
    return imageResponse
  } catch {
    dispatch(
      setError({
        type: ErrorType.FILE,
        message: 'Failed to upload avatar image.',
      }),
    )
  }
}

export const uploadLocationImage = async (
  id: string,
  token: string,
  file: File,
  dispatch: AppDispatch,
) => {
  try {
    const formData = new FormData()
    formData.append('image', file as File, file?.name)
    const imageResponse = await API.uploadLocationImage(
      token,
      formData,
      id,
      dispatch,
    )
    if (!imageResponse) return
    return imageResponse
  } catch {
    dispatch(
      setError({
        type: ErrorType.FILE,
        message: 'Failed to upload location image.',
      }),
    )
  }
}

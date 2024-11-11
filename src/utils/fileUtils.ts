import { setError } from 'stores/errorSlice'
import { ErrorType } from 'constants/errorConstants'
import { AppDispatch } from 'stores/store'

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

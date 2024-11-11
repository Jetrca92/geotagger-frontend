import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorType } from 'constants/errorConstants'

interface ErrorState {
  apiError: string
  fileError: string
  showApiError: boolean
  showFileError: boolean
}

const initialState: ErrorState = {
  apiError: '',
  fileError: '',
  showApiError: false,
  showFileError: false,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(
      state,
      action: PayloadAction<{
        type: ErrorType.API | ErrorType.FILE
        message: string
      }>,
    ) {
      const { type, message } = action.payload
      if (type === ErrorType.API) {
        state.apiError = message
        state.showApiError = true
      } else if (type === ErrorType.FILE) {
        state.fileError = message
        state.showFileError = true
      }
    },
    clearError(state, action: PayloadAction<ErrorType.API | ErrorType.FILE>) {
      const type = action.payload
      if (type === ErrorType.API) {
        state.apiError = ''
        state.showApiError = false
      } else if (type === ErrorType.FILE) {
        state.fileError = ''
        state.showFileError = false
      }
    },
    clearAllErrors(state) {
      state.apiError = ''
      state.fileError = ''
      state.showApiError = false
      state.showFileError = false
    },
  },
})

export const { setError, clearError, clearAllErrors } = errorSlice.actions
export default errorSlice.reducer

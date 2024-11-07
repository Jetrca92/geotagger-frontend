import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ErrorState {
  apiError: string
  showError: boolean
}

const initialState: ErrorState = {
  apiError: '',
  showError: false,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.apiError = action.payload
      state.showError = true
    },
    clearError(state) {
      state.apiError = ''
      state.showError = false
    },
  },
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer

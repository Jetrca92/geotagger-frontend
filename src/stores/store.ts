import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import errorReducer from './errorSlice'
import userReducer from './userSlice'
import locationsReducer from './locationsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
    locations: locationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

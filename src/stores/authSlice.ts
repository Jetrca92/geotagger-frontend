import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from 'models/auth'
import { userStorage } from 'utils/localStorage'
import { RootState } from './store'

interface AuthState {
  user: UserType | null
}

const initialState: AuthState = {
  user: userStorage.getUser() || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>,
    ) => {
      const { user, token } = action.payload
      userStorage.setToken(token)
      userStorage.setUser(user)
      state.user = user
    },
    updateUser: (state, action: PayloadAction<{ user: UserType }>) => {
      const { user } = action.payload
      userStorage.setUser(user)
      state.user = user
    },
    signout: (state) => {
      userStorage.clearUser()
      userStorage.clearToken()
      state.user = null
    },
  },
})

export const { login, updateUser, signout } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer

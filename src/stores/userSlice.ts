import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface LocationType {
  id: string
  latitude: number
  longitude: number
  address: string
  imageUrl?: string
  ownerId: string
}

interface GuessType {
  id: string
  guessedLatitude: number
  guessedLongitude: number
  errorDistance: number
  locationId: string
}

interface UserState {
  locations: LocationType[]
  guesses: GuessType[]
}

const initialState: UserState = {
  locations: [],
  guesses: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<LocationType[]>) => {
      state.locations = action.payload
    },
    addLocation: (state, action: PayloadAction<LocationType>) => {
      state.locations.push(action.payload)
    },
    updateLocation: (state, action: PayloadAction<LocationType>) => {
      const index = state.locations.findIndex(
        (loc) => loc.id === action.payload.id,
      )
      if (index !== -1) {
        state.locations[index] = action.payload
      }
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (loc) => loc.id !== action.payload,
      )
    },
    setGuesses: (state, action: PayloadAction<GuessType[]>) => {
      state.guesses = action.payload
    },
    addGuess: (state, action: PayloadAction<GuessType>) => {
      state.guesses.push(action.payload)
    },
    clearGuesses: (state) => {
      state.guesses = []
    },
  },
})

export const {
  setLocations,
  addLocation,
  updateLocation,
  removeLocation,
  setGuesses,
  addGuess,
  clearGuesses,
} = userSlice.actions

export const selectLocations = (state: RootState) => state.user.locations
export const selectGuesses = (state: RootState) => state.user.guesses

export default userSlice.reducer

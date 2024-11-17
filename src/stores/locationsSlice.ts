import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocationType } from 'models/location'
import { RootState } from './store'

interface LocationsState {
  locations: LocationType[]
}

const initialState: LocationsState = {
  locations: [],
}

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setAllLocations(state, action: PayloadAction<LocationType[]>) {
      state.locations = action.payload
    },
  },
})

export const { setAllLocations } = locationsSlice.actions
export const selectAllLocations = (state: RootState) =>
  state.locations.locations
export default locationsSlice.reducer

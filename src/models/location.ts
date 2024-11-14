import { UserType } from './auth'

export type LocationType = {
  id: string
  latitude: number
  longitude: number
  imageUrl: string
  address: string
  owner: UserType
}

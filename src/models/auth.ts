import { LocationType } from './location'

export type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  points: number
  locations?: LocationType[]
  guesses?: {
    id: string
  }
  isAdmin: boolean
}

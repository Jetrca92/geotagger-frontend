export type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  points: number
  locations?: {
    id: string
  }
  guesses?: {
    id: string
  }
}

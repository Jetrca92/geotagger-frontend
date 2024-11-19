export type GuessType = {
  id: string
  createdAt: string
  guessedLatitude: number
  guessedLongitude: number
  address: string
  errorDistance: number
  owner: GuessOwnerType
  locationId: string
}

export type GuessOwnerType = {
  id: string
  firstName: string
  lastName: string
  avatarUrl?: string
}

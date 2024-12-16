export type LogType = {
  id: string
  createdAt: string
  user: LogOwnerType
  action: string
  componentType?: string
  newValue?: string
  location: string
}

export type LogOwnerType = {
  id: string
  firstName: string
  lastName: string
  avatarUrl?: string
}

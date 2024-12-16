import { UserType } from 'models/auth'

const user_prefix = 'user'
const token_prefix = 'token'

const userStorage = {
  getUser: (): UserType | null => {
    if (typeof window === 'undefined') return null
    const userData = window.localStorage.getItem(user_prefix)
    try {
      return userData ? (JSON.parse(userData) as UserType) : null
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error)
      return null
    }
  },
  setUser: (user: UserType): void => {
    window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user))
  },
  clearUser: (): void => {
    window.localStorage.removeItem(`${user_prefix}`)
  },
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(`${token_prefix}`)
  },
  setToken: (token: string): void => {
    window.localStorage.setItem(`${token_prefix}`, token)
  },
  clearToken: (): void => {
    window.localStorage.removeItem(`${token_prefix}`)
  },
}

export { userStorage }

import { create } from 'zustand'

export type RoleType = 'public' | 'admin' | 'subscriber'

interface IUser {
  email: string
  fisrtName: string
  lastName: string
  image: string
  role: RoleType
}

interface IUserState {
  user: IUser | null
  logout: () => void
  isAuthenticated: boolean
  setUser: (user: IUser) => void
}

function getUser(): IUser | null {
  const item = localStorage.getItem('dx_user')

  if (item != null) return JSON.parse(item) as IUser

  return null
}

export const useUserStore = create<IUserState>((set) => ({
  user: getUser(),
  setUser: (user) => {
    set({ user })
    set({ isAuthenticated: true })
    localStorage.setItem('dx_user', JSON.stringify(user))
  },
  logout: () => {
    set({ user: null })
    set({ isAuthenticated: false })
    localStorage.removeItem('dx_user')
  },
  isAuthenticated: Boolean(getUser())
}))

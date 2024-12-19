import { create } from 'zustand'
import type { User } from '../types'

interface UserStore {
	user: User | null
	updateUser: (newUser: User) => void
	deleteUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	updateUser: (newUser: User) => set({ user: newUser }),
	deleteUser: () => set({ user: null })
}))

export const UserStore = (): User | null =>
	useUserStore((state) => state.user)

export const getUser = (): User | null => {
	return UserStore()
}

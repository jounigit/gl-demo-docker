import { create } from 'zustand'

type Token = {
	token: string | null
}

type Action = {
	updateToken: (newToken: string) => void
	deleteToken: () => void
}

export const useTokenStore = create<Token & Action>(
	(set) => ({
		token: null,
		updateToken: (newToken: string) =>
			set({ token: newToken }),
		deleteToken: () => set({ token: null }),
	}),
)

export const TokenStore = (): string | null =>
	useTokenStore((state) => state.token)

export const getToken = (): string | null => {
	return TokenStore()
}

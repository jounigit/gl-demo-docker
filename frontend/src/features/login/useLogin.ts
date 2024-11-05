import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import type { LoginResponse } from '../../types'
import { apiClient } from '../../services/http-common'

interface Params {
	email: string
	password: string
}

export interface LogoutResponse {
	message: string
}

export const login = async (
	payload: Params,
): Promise<LoginResponse> => {
	const response = await apiClient.post('/login', {
		email: payload.email,
		password: payload.password,
	})
	return response.data
}

export const logout = async (): Promise<LogoutResponse> => {
	const response = await apiClient.delete('/logout')
	console.log('-Logout: ', response.data)
	return response.data
}

export function useLogin(): UseMutationResult<
	unknown,
	unknown,
	Params,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			useClient.invalidateQueries({ queryKey: ['user'] })
			console.log('-UseLogin: ', data)
		},
	})
}

export function useLogout(): UseMutationResult<
	unknown,
	unknown,
	null,
	unknown
> {
	return useMutation({
		mutationFn: logout,
		onSuccess: (data) => {
			console.log('-UseLogout: ', data)
		},
	})
}

import toast from 'react-hot-toast'
import type { Picture, UpdatePicture } from '../../types'
import { apiClient } from '../../services/http-common'
import {
	useMutation,
	type UseMutationResult,
	useQuery,
	useQueryClient,
	type UseQueryResult,
	useSuspenseQuery,
	type UseSuspenseQueryResult,
} from '@tanstack/react-query'
import { getAll, getOne } from '../../services/apiService'

// ###################### services #########################################

//**  Create */
type CreateProps = {
	picture: File
}

interface UpdateProps {
	id: number
	newPicture: UpdatePicture
}

export const createPicture = async (
	newPic: CreateProps,
) => {
	const promise = apiClient.post<unknown>('/upload', newPic)
	const response = await toast.promise(promise, {
		loading: 'Loading...',
		success: 'Picture stored successfully!',
		error: (e) => `Failed to store picture -\n${e.message}`,
	})
	return response.data
}

//**  Update */
export const updatePicture = async ({
	id,
	newPicture,
}: UpdateProps) => {
	const promise = apiClient.put(
		`/pictures/${id}`,
		newPicture,
	)
	const response = await toast.promise(promise, {
		loading: 'Loading...',
		success: 'Picture updated successfully!',
		error: (e) =>
			`Failed to update picture -\n${e.message}`,
	})
	return response.data
}

//**  delete */
export const deletePicture = async (id: number) => {
	const promise = apiClient.delete(`/pictures/${id}`)
	const response = await toast.promise(promise, {
		loading: 'Working...',
		success: 'Picture removed!',
		error: (e) =>
			`Failed to remove picture -\n${e.message}`,
	})
	return response.data
}

// ####################### query hooks ########################################
export function usePictures(): UseQueryResult<
	Picture[],
	unknown
> {
	return useQuery({
		queryKey: ['pictures'],
		queryFn: async () => await getAll<Picture>('pictures'),
		throwOnError: true,
	})
}

export function usePicture(
	id: number,
): UseQueryResult<Picture, unknown> {
	return useQuery({
		queryKey: ['pictures', id],
		queryFn: async () =>
			await getOne<Picture>({ id, url: 'pictures' }),
		throwOnError: true,
	})
}

export function useSuspensePicture(
	id: number,
): UseSuspenseQueryResult<Picture, unknown> {
	return useSuspenseQuery({
		queryKey: ['pictures', id],
		queryFn: async () =>
			await getOne<Picture>({ id, url: 'pictures' }),
	})
}

// ####################### mutations ########################################
export const useCreatePicture = () => {
	return useMutation({
		mutationFn: createPicture,
		onSuccess: (data) => {
			console.log({ data })
		},
		onError: (error) => {
			console.log({ error })
		},
	})
}

export function useUpdatePicture(): UseMutationResult<
	unknown,
	unknown,
	UpdateProps,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: updatePicture,
		onSuccess: () => {
			useClient.invalidateQueries({
				queryKey: ['pictures'],
			})
		},
		onError: () => {
			toast.error('Failed to update Picture!')
		},
	})
}

export function useDeletePicture(): UseMutationResult<
	unknown,
	unknown,
	number,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: deletePicture,
		onSuccess: () => {
			console.log('- Use delete success')
			useClient.invalidateQueries()
		},
		onError: () => {
			console.log('- Use delete error')
		},
	})
}

import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import type {
	AlbumPicture,
	AlbumPictureProps
} from '../../types'
import toast from 'react-hot-toast'
import { apiClient } from '../../services/http-common'
import { getAll } from '../../services/apiService'

// ###################### services #########################################
const addAlbumPicture = async (
	albumPictureProps: AlbumPictureProps,
): Promise<unknown> => {
	const promise = apiClient.post<unknown>(
		'/album-picture',
		albumPictureProps,
	)

	const response = await toast.promise(promise, {
		loading: 'Loading...',
		success: 'Picture chosen successfully!',
		error: (e) => `Failed to choose album -\n${e.message}`,
	})

	return response.data
}

export const deleteAlbumPicture = async (
	albumPictureProps: AlbumPictureProps,
): Promise<unknown> => {
	const promise = apiClient.delete<unknown>(
		'/album-picture',
		{data: albumPictureProps}
	)
	const response = await toast.promise(promise, {
		loading: 'Working...',
		success: 'Picture removed!',
		error: (e) => `Failed to remove -\n${e.message}`,
	})
	return response
}

// ####################### query hooks ########################################
export function useAlbumPictures(): UseQueryResult<
	AlbumPicture[],
	unknown
> {
	return useQuery({
		queryKey: ['album-pictures'],
		queryFn: async () => await getAll('album-picture'),
		throwOnError: true,
	})
}

// ####################### mutations ########################################
export function useAddAlbumPicture(): UseMutationResult<
	unknown,
	unknown,
	AlbumPictureProps,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: addAlbumPicture,
		onSuccess: () => {
			useClient.invalidateQueries()
		},
	})
}

export function useDeleteAlbumPicture(): UseMutationResult<
	unknown,
	unknown,
	AlbumPictureProps,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: deleteAlbumPicture,
		onSuccess: () => {
			console.log('- Use delete success')
			useClient.invalidateQueries()
		},
		onError: () => {
			console.log('- Use delete error')
		},
	})
}

import {
	useMutation,
	type UseMutationResult,
	useQuery,
	useQueryClient,
	type UseQueryResult,
	useSuspenseQuery,
	type UseSuspenseQueryResult,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { apiClient } from '../../services/http-common'
import {
	getOne,
	getBySlug,
} from '../../services/apiService'
import type { Album, NewAlbum, UpdateAlbum } from '../../types'

// ####################### services ########################################
//**  Get all */
export const fetchAlbumList = async (): Promise<
	Album[]
> => {
	const response = await apiClient.get('albums')
	return response.data
}

//**  Delete */
export const deleteAlbum = async (
	id: number,
): Promise<unknown> => {
	const promise = apiClient.delete(`/albums/${id}`)
	const response = await toast.promise(promise, {
		loading: 'Working...',
		success: 'Album removed!',
		error: (e) => `Failed to remove -\n${e.message}`,
	})
	return response.data
}

//**  Create */
export const createAlbum = async (
	newAlbum: NewAlbum,
): Promise<unknown> => {
	const promise = apiClient.post<unknown>(
		'/albums',
		newAlbum,
	)
	const response = await toast.promise(promise, {
		loading: 'Loading...',
		success: 'Album stored successfully!',
		error: (e) => `Failed to store album -\n${e.message}`,
	})
	return response.data
}

interface UpdateProps {
	id: number
	album: UpdateAlbum
}

export const updateAlbum = async ({
	id,
	album,
}: UpdateProps): Promise<Album> => {
	const promise = apiClient.put(`/albums/${id}`, album)
	const response = await toast.promise(promise, {
		loading: 'Loading...',
		success: 'Album updated successfully!',
		error: (e) => `Failed to update album -\n${e.message}`,
	})
	return response.data
}

// ####################### query hooks ########################################
export function useAlbums(): UseQueryResult<
	Album[],
	unknown
> {
	return useQuery({
		queryKey: ['albums'],
		queryFn: fetchAlbumList,
		throwOnError: true,
	})
}

export function useAlbum(
	id: number,
): UseQueryResult<Album, unknown> {
	return useQuery({
		queryKey: ['albums', id],
		queryFn: async () =>
			await getOne<Album>({ id, url: 'albums' }),
		throwOnError: true,
	})
}

export function useAlbumBySlug(
	slug: string,
): UseQueryResult<Album, unknown> {
	return useQuery({
		queryKey: ['albums', slug],
		queryFn: async () =>
			await getBySlug<Album>({ slug, url: 'album' }),
		throwOnError: true,
	})
}

export function useSuspenseAlbumBySlug(
	slug: string,
): UseSuspenseQueryResult<Album, unknown> {
	return useSuspenseQuery<Album, unknown>({
		queryKey: ['albums', slug],
		queryFn: async () =>
			await getBySlug<Album>({ slug, url: 'album' }),
	})
}

// ####################### mutations ########################################
export function useCreateAlbum(): UseMutationResult<
	unknown,
	unknown,
	NewAlbum,
	unknown
> {
	return useMutation({ mutationFn: createAlbum })
}

export function useUpdateAlbum(): UseMutationResult<
	unknown,
	unknown,
	UpdateProps,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: updateAlbum,
		onSuccess: () => {
			useClient.invalidateQueries({ queryKey: ['albums'] })
		},
		onError: () => {
			toast.error('Failed to update Album!')
		},
	})
}

export function useDeleteAlbum(): UseMutationResult<
	unknown,
	unknown,
	number,
	unknown
> {
	const useClient = useQueryClient()
	return useMutation({
		mutationFn: deleteAlbum,
		onSuccess: () => {
			toast.success('Album deleted successfully.')
			useClient.invalidateQueries({ queryKey: ['albums'] })
		},
	})
}

// ##################################################

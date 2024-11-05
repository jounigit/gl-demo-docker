import type {
	IdUrlParams,
	OneRecord,
	SlugUrlParams,
} from '../types'
import { apiClient } from './http-common'

export type GetAllFn<T> = (url: string) => Promise<T[]>

export async function getAll<T>(url: string): Promise<T[]> {
	const { data } = await apiClient.get(`/${url}`)
	return data
}

export async function getOne<T>({
	id,
	url,
}: IdUrlParams): Promise<T> {
	const { data } = await apiClient.get(`/${url}/${id}`)
	return data
}

export async function getBySlug<T>({
	slug,
	url,
}: SlugUrlParams): Promise<T> {
	const { data } = await apiClient.get(`/${url}/${slug}`)
	return data
}

export const createOne = async <T extends object>(
	url: string,
	newRecord: T,
): Promise<unknown> => {
	const response = await apiClient.post<unknown>(
		`${url}`,
		newRecord,
	)
	return response.data
}

export const updateOne = async <T extends object>(
	id: number,
	url: string,
	newRecord: T,
): Promise<OneRecord> => {
	const { data } = await apiClient.put(
		`/${url}/${id}`,
		newRecord,
	)
	return data
}

export const deleteOne = async ({
	id,
	url,
}: IdUrlParams): Promise<unknown> => {
	return await apiClient.delete(`/${url}/${id}`)
}

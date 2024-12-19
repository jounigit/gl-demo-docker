import type { AlbumPictureProps } from '@/types'
import type { UseMutateFunction } from '@tanstack/react-query'

export function deletePictureFromAlbum(
	albumId: number,
	deleteAPic: UseMutateFunction<
		unknown,
		unknown,
		AlbumPictureProps,
		unknown
	>
) {
	return (id: number) => {
		console.log('Del pid: ', id, ' - aid: ', albumId)
		const albumPic: AlbumPictureProps = {
			albumId: albumId,
			pictureId: id
		}
		deleteAPic(albumPic)
	}
}

export function addPictureToAlbum(
	albumId: number,
	mutate: UseMutateFunction<
		unknown,
		unknown,
		AlbumPictureProps,
		unknown
	>
) {
	return (id: number) => {
		const newAlbumPic: AlbumPictureProps = {
			albumId: albumId,
			pictureId: id
		}
		mutate(newAlbumPic)
	}
}

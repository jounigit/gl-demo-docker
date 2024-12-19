import { getAll } from '@/services/apiService'
import { ListContainer } from '@/styles/styles'
import type { Album } from '@/types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AlbumListItem } from './AlbumListItem'

export const AlbumList = (): JSX.Element => {
	const { data } = useSuspenseQuery({
		queryKey: ['albums'],
		queryFn: async () => await getAll<Album>('albums')
	})

	return (
		<ListContainer>{renderAlbumList(data)}</ListContainer>
	)
}

const renderAlbumList = (albums: Album[]) => {
	if (albums.length === 0) {
		return <h4>No albums yet.</h4>
	}

	return albums.map((album) => (
		<AlbumListItem key={album.id} album={album} />
	))
}

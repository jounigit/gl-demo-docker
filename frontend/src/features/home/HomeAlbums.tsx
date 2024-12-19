import { ListHomeContainer } from '@/styles/styles'
import { isAlbumArray } from '@/types'
import { useAlbums } from '../album/useAlbum'
import { ListHomeItem } from './ListHomeItem'

export const HomeAlbums = ({ albumCount = 3 }) => {
	const { data: Albums } = useAlbums()

	if (Albums === undefined || !isAlbumArray(Albums)) {
		return <div>No albums yet.</div>
	}

	const displayedAlbums = Albums.slice(0, albumCount)
	const showAlbums = displayedAlbums.map((a, i) => (
		<ListHomeItem key={a.id} album={a} order={i} />
	))

	return <ListHomeContainer>{showAlbums}</ListHomeContainer>
}

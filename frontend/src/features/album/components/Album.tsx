import { useParams } from 'react-router-dom'
import { AlbumDetails } from './AlbumDetails'
import { useAlbumBySlug } from '../useAlbum'
import { FadeDiv } from '@/components/atoms'
import { AlbumContainer, AlbumWithContent, AlbumWithoutContent, DetailsContainer, DetailsContainerForTwoCol } from './album.styles'

const Album = (): JSX.Element => {
	const { slug } = useParams() as { slug: string }
	const { data: album } = useAlbumBySlug(slug)

	if (!album) {
		return <h4>No data yet.</h4>
	}

	const { content } = album
	console.log({content})
	const Container = content
		? AlbumWithContent
		: AlbumWithoutContent

	return (
		<FadeDiv $timein='0.3s'>
			<Container data-cy='albumDetails'>
				<AlbumDetails album={album} />
			</Container>
		</FadeDiv>
	)
}

export default Album

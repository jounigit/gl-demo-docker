import { useParams } from 'react-router-dom'
import { AlbumDetails } from './AlbumDetails'
import { useAlbumBySlug } from '../useAlbum'
import {
	DetailsContainer,
	DetailsContainerForTwoCol
} from '@/styles/styles'
import { FadeDiv } from '@/components/atoms'

const Album = (): JSX.Element => {
	const { slug } = useParams() as { slug: string }
	const { data: album } = useAlbumBySlug(slug)

	if (!album) {
		return <h4>No data yet.</h4>
	}

	const { content } = album
	const AlbumContainer = content
		? DetailsContainerForTwoCol
		: DetailsContainer

	return (
		<FadeDiv timein='0.3s'>
			<AlbumContainer data-cy='albumDetails'>
				<AlbumDetails album={album} isContent={!!content} />
			</AlbumContainer>
		</FadeDiv>
	)
}

export default Album

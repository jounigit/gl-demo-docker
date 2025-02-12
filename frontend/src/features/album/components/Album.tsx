import { useParams } from 'react-router-dom'
import { AlbumDetails } from './AlbumDetails'
import { useAlbumBySlug } from '../useAlbum'
import { FadeDiv } from '@/components/atoms'
import { AlbumWithContent, AlbumWithoutContent } from './album.styles'
import styled from 'styled-components'

const Header = styled.header`
	h2 {
		display: inline-block;
		margin-right: 15px;
	}
	h3 {
		display: inline-block;
	}

`

const Album = (): JSX.Element => {
	const { slug } = useParams() as { slug: string }
	const { data: album } = useAlbumBySlug(slug)

	if (!album) {
		return <h4>No data yet.</h4>
	}

	const Container = album?.content
		? AlbumWithContent
		: AlbumWithoutContent

	return (
		<FadeDiv $timein='0.3s'>
			<Container data-cy='albumDetails'>
				<Header>
					<h2>{album.title}</h2>
					<h3>{album.year}</h3>
				</Header>
				<Header />
				<AlbumDetails album={album} />
			</Container>
		</FadeDiv>
	)
}

export default Album

import { useParams } from 'react-router-dom'
import { AlbumDetails } from './AlbumDetails'
import { useAlbumBySlug } from '../useAlbum'
import { FadeDiv } from '@/components/atoms'
import { AlbumWithContent, AlbumWithoutContent } from './album.styles'
<<<<<<< HEAD
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
=======
>>>>>>> v-20-tinymce

const Album = (): JSX.Element => {
	const { slug } = useParams() as { slug: string }
	const { data: album } = useAlbumBySlug(slug)

	if (!album) {
		return <h4>No data yet.</h4>
	}

<<<<<<< HEAD
	const Container = album?.content
=======
	const { content } = album
	console.log({content})
	const Container = content
>>>>>>> v-20-tinymce
		? AlbumWithContent
		: AlbumWithoutContent

	return (
		<FadeDiv $timein='0.3s'>
			<Container data-cy='albumDetails'>
<<<<<<< HEAD
				<Header>
					<h2>{album.title}</h2>
					<h3>{album.year}</h3>
				</Header>
				<Header />
=======
>>>>>>> v-20-tinymce
				<AlbumDetails album={album} />
			</Container>
		</FadeDiv>
	)
}

export default Album

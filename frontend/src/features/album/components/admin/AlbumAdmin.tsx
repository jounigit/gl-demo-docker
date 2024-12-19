import { useParams } from 'react-router-dom'
import { ActionLinks } from './ActionLinks'
import { useSuspenseAlbumBySlug } from '../../useAlbum'
import { AlbumDetails } from '../AlbumDetails'
import { useGoBack } from '@/hooks/useGoBack'
import { Button } from '@/components/atoms/Button'
import {
	Row,
	Col,
	Grid
} from '@/components/dashboard/components/Dashboard.styles'
import { DetailsContainer } from '@/styles/styles'

const AlbumAdmin = (): JSX.Element => {
	const { slug } = useParams() as { slug: string }
	const { data } = useSuspenseAlbumBySlug(slug)
	const goBack = useGoBack()

	const { linkUpdate, linkPictures } = ActionLinks({
		id: data.id
	})
	return (
		<>
			<Button onClick={goBack}>...takaisin</Button>
			<Grid size={2}>
				<Row>
					<Col size={1} />
					<Col size={1}>
						{linkUpdate}
						{linkPictures}
					</Col>
				</Row>
			</Grid>

			<DetailsContainer data-cy='albumDetails'>
				<AlbumDetails album={data} />
			</DetailsContainer>
		</>
	)
}

export default AlbumAdmin

import { type FC, Fragment } from 'react'
import styled from 'styled-components'
import { ActionLinks } from './ActionLinks'
import { AlbumDelete } from './AlbumDelete'
import { ImageInDiv } from '@/components/atoms/ImageInDiv'
import { Modal } from '@/components/modal/modal'
import { useModal } from '@/hooks/useModal'
import { MOBILE } from '@/styles'
import {
	ListItemImageGrid,
	ListItemInfoText
} from '@/styles/styles'
import { colors } from '@/styles/theme'
import type { Album } from '@/types'

const ImageItem = styled(ListItemImageGrid)`
    grid-template-columns: 1fr;
    margin: 0.5rem 1rem 0.5rem 0;
`

const Content = styled.div`
    padding: 1.5rem;
`
const Links = styled.div`
`
const Container = styled.div`
  background: ${colors.grey1};
  border: 1px solid grey;

  @media ${MOBILE} {
    display: grid;  
    grid-template-columns: 1fr 2fr 1fr;
  }
`

interface ListProps {
	album: Album
}

export const AlbumListItemAdmin: FC<ListProps> = ({
	album: { id, title, slug, pictures }
}) => {
	const { isShown, toggle } = useModal()
	const pictureCount = pictures.length

	// ****************** actions *********************************** //
	const { link, linkUpdate, linkRemove, linkPictures } =
		ActionLinks({ id, slug, toggle })

	// **************** return ***************************************** //
	return (
		<Fragment>
			<Container data-cy='listItem'>
				<ImageItem width={150} height={150}>
					{pictures.length > 0 ? (
						<ImageInDiv data={pictures[0]} />
					) : (
						<h4 style={{ paddingLeft: '40px' }}>
							no images yet.
						</h4>
					)}
				</ImageItem>

				<Content>
					<h3>{title}</h3>
					<ListItemInfoText>
						<h4>{pictureCount} kuvaa</h4>
					</ListItemInfoText>
				</Content>

				<section>
					<Links>{link}</Links>
					<Links>{linkUpdate}</Links>
					<Links>{linkPictures}</Links>
					<Links>{linkRemove}</Links>
				</section>
			</Container>

			<Modal
				isShown={isShown}
				hide={toggle}
				headerText='Albumin poisto'
				modalContent={
					<AlbumDelete
						id={id}
						title={title}
						toggle={toggle}
					/>
				}
			/>
		</Fragment>
	)
}

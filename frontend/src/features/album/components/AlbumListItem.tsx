import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { Album } from '@/types'
import { RenderImages } from '@/components/atoms/RenderImages'
import { ListImgBox, ListItemContainer, ListItemImageGrid, ListItemInfo, ListItemInfoText } from './album.styles'

interface ListProps {
	album: Album
}

export const AlbumListItem: FC<ListProps> = ({
	album: { title, slug, pictures }
}) => {
	const twoPics = pictures.slice(0, 2)
	const pictureCount = pictures.length

	return (
		<ListItemContainer data-cy='albumListItem'>
			<Link
				data-cy='albumListItemLink'
				style={{ textDecoration: 'none' }}
				to={`/galleria/${slug}`}
			>
				<ListImgBox>
					<ListItemImageGrid width={200} height={200}>
						{twoPics.length > 0 ? (
							<RenderImages
								data={twoPics}
								showInfo={false}
							/>
						) : (
							<h4>No albums yet.</h4>
						)}
					</ListItemImageGrid>
				</ListImgBox>
			</Link>

			<Link
				style={{ textDecoration: 'none' }}
				to={`/album/${slug}`}
			>
				<ListItemInfo>
					<h3>{title}</h3>
					<ListItemInfoText>
						<h4>{pictureCount} kuvaa</h4>
					</ListItemInfoText>
				</ListItemInfo>
			</Link>
		</ListItemContainer>
	)
}

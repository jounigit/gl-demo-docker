import { type FC, Fragment } from 'react'
import {
	isPictureArray,
	type Picture,
	type Album
} from '@/types'
import { PictureGalleria } from '@/features/picture/components/PictureGalleria'
import { DetailsImgBox, DetailsText, DetailsTitle } from '../album.styles'

interface Props {
	album: Album
}

export const AlbumDetailsAdmin: FC<Props> = ({
	album: { title, content, year, pictures }
}) => {
	return (
		<Fragment>
			<DetailsTitle>
				<h2>{title}</h2>
			</DetailsTitle>
			<h4>{year}</h4>
			<DetailsText>{content}</DetailsText>
			{isPictureArray(pictures) && renderImages(pictures)}
		</Fragment>
	)
}

const renderImages = (pictures: Picture[]) => {
	return (
		<DetailsImgBox>
			<PictureGalleria
				imageList={pictures}
				$gridwidth={150}
				$imgheight={150}
			/>
		</DetailsImgBox>
	)
}

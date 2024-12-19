/**
 * the AlbumDetails component is designed to display an album's pictures in a flexible layout,
 * either in a single-column or two-column format,
 * depending on whether additional content is provided.
 * The use of styled components and a separate PictureGalleria
 * component allows for a clean and modular design.
 * */
import { type FC, Fragment } from 'react'
import type { Album } from '@/types'
import {
	DetailsImgBox,
	DetailsImgBoxTwoColumn,
	DetailsInfoTxt
} from '@/styles/styles'
import { PictureGalleria } from '@/features/picture/components/PictureGalleria'

interface Props {
	album: Album
	isContent?: boolean
}

export const AlbumDetails: FC<Props> = ({
	album: { pictures, title, year, content },
	isContent
}) => {
	const ImgBoxContainer = isContent
		? DetailsImgBoxTwoColumn
		: DetailsImgBox

	return (
		<Fragment>
			<DetailsImgBoxTwoColumn>
				<PictureGalleria
					imageList={pictures}
					$gridwidth={250}
					$imgheight={250}
					$centered={false}
				/>
			</DetailsImgBoxTwoColumn>
			<DetailsInfoTxt>
				<h2>{title}</h2>
				<p>{year}</p>
				<p>{content}</p>
			</DetailsInfoTxt>
		</Fragment>
	)
}

/**
 * the AlbumDetails component is designed to display an album's pictures in a flexible layout,
 * either in a single-column or two-column format,
 * depending on whether additional content is provided.
 * The use of styled components and a separate PictureGalleria
 * component allows for a clean and modular design.
 * */
import { type FC, Fragment } from 'react'
import type { Album } from '@/types'
import { DetailsInfoTxt } from './album.styles'
import { PictureGalleria } from '@/features/picture/components/PictureGalleria'
import incrementByMediaQuery from '@/components/atoms/incrementByMediaQuery'

interface Props {
	album: Album
}

export const AlbumDetails: FC<Props> = ({ album: { pictures, title, year, content } }) => {

	const measure = content
			? incrementByMediaQuery(150, 20)
			: incrementByMediaQuery(200, 50)

	return (
		<Fragment>
			<div>
				<PictureGalleria
					imageList={pictures}
					$gridwidth={measure}
					$imgheight={measure}
					$centered={false}
				/>
			</div>
			<DetailsInfoTxt>
				<h2>{title}</h2>
				<p>{year}</p>
				<p>{content}</p>
			</DetailsInfoTxt>
		</Fragment>
	)
}

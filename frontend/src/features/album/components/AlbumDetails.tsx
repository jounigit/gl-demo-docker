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
<<<<<<< HEAD
import styled from 'styled-components'
import DOMPurify from 'dompurify'
=======
>>>>>>> v-20-tinymce

interface Props {
	album: Album
}

<<<<<<< HEAD
export const AlbumDetails: FC<Props> = ({ album: { pictures, content } }) => {
=======
export const AlbumDetails: FC<Props> = ({ album: { pictures, title, year, content } }) => {
>>>>>>> v-20-tinymce

	const measure = content
			? incrementByMediaQuery(150, 20)
			: incrementByMediaQuery(200, 50)

<<<<<<< HEAD
	
	const sanitizedHtml = content ? DOMPurify.sanitize(content) : ''
	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
		const htmlText = content ? <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} /> : ''

=======
>>>>>>> v-20-tinymce
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
<<<<<<< HEAD
			<HtmlContent>{htmlText}</HtmlContent>
=======
				<h2>{title}</h2>
				<p>{year}</p>
				<p>{content}</p>
>>>>>>> v-20-tinymce
			</DetailsInfoTxt>
		</Fragment>
	)
}
<<<<<<< HEAD

export const HtmlContent = styled.div`
    flex: 1;
    margin: 0 1rem 1rem 1rem;
	ul {
		padding-left: 50px;
	}
    p {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }
`
=======
>>>>>>> v-20-tinymce

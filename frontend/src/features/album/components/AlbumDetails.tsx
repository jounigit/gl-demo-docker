/**
 * the AlbumDetails component is designed to display an album's pictures in a flexible layout,
 * either in a single-column or two-column format,
 * depending on whether additional content is provided.
 * The use of styled components and a separate PictureGalleria
 * component allows for a clean and modular design.
 * */
import { type FC, Fragment } from 'react'
import type { Album } from '@/types'
import { PictureGalleria } from '@/features/picture/components/PictureGalleria'
import { AlbumImage, AlbumImages, DetailsInfoTxt } from './album.styles'
// import { RenderImages } from '@/components/atoms/RenderImages'
import styled from 'styled-components'

interface Props {
	album: Album
}
                            
const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px; /* Space between images */
    padding: 10px; /* Padding around the gallery */
`
const GalleryImage = styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%; /* This creates a square aspect ratio */
    overflow: hidden; /* Ensures that the image doesn't overflow */
	
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export const AlbumDetails: FC<Props> = ({ album: { pictures, title, year, content } }) => {

	const show = pictures.map((p) => (
		<GalleryImage key={p.id}>
			<img src={p.thumbnailUrl} alt="" />
			{/* <Image src={p.thumbnailUrl} alt="" /> */}
		</GalleryImage>
	)
	)

	return (
		<Fragment>
			<Gallery>
				{show}
				{/* <RenderImages data={pictures} showInfo={false} /> */}
				{/* <Card>XXX</Card>
				<Card>YYY</Card>
				<Card>XXX</Card>
				<Card>YYY</Card>
				<Card>XXX</Card>
				<Card>YYY</Card> */}
			</Gallery>
			{/* <DetailsImgBoxTwoColumn>
				<PictureGalleria
					imageList={pictures}
					$gridwidth={250}
					$imgheight={250}
					$centered={false}
				/>
			</DetailsImgBoxTwoColumn> */}
			<DetailsInfoTxt>
				<h2>{title}</h2>
				<p>{year}</p>
				<p>{content}</p>
			</DetailsInfoTxt>
		</Fragment>
	)
}

const Card = styled.div`
  background-color: dodgerblue;
  color: white;
  padding: 1rem;
  /* height: 4rem; */
`
const Image = styled.img`
	width: 100%;
	height: auto;
    object-fit: cover;
`
import { type FC, useState } from 'react'
import { ImageGrid, type ImageGridProps } from './pictureGalleria.style'
import { useWindowSize } from 'usehooks-ts'
import type { Picture } from '@/types'
import { useModal } from '@/hooks/useModal'
import { RenderImagesWithLinks } from '@/components/atoms/RenderImagesWithLinks'
import { Modal } from '@/components/modal/modal'
import { ImageModal } from '@/components/image-modal/image-modal'
import { RenderImages } from '@/components/atoms/RenderImages'

interface PictureMediaProps extends ImageGridProps {
	imageList: Picture[]
}

export const PictureGalleria: FC<PictureMediaProps> = ({
	imageList,
	$gridwidth,
	$imgheight,
	$gap
}) => {
	const { isShown, toggle } = useModal()
	const [selectedImage, setSelectedImage] = useState<
		Picture | undefined
	>()
	const { width: winWidth } = useWindowSize()
	const isMobile = winWidth < 768

	const handleImageClick = (imgSrc: Picture): void => {
		setSelectedImage(imgSrc)
		toggle()
	}

	const renderImages = () => {
		if (isMobile) {
			return <RenderImages data={imageList} />
		}
		return (
			<RenderImagesWithLinks
				data={imageList}
				onDivClick={handleImageClick}
			/>
		)
	}

	// const GridContainer = isContent
	// 	? ImageGridAllWidth
	// 	: ImageGrid

	return (
		<>
			<ImageGrid
				$gridwidth={$gridwidth}
				$imgheight={$imgheight}
				$centered
				$gap={$gap}
			>
				{renderImages()}
			</ImageGrid>

			{selectedImage && (
				<ImageModalComponent
					img={selectedImage}
					isShown={isShown}
					toggle={toggle}
				/>
			)}
		</>
	)
}

const ImageModalComponent: FC<{
	img: Picture
	isShown: boolean
	toggle: () => void
}> = ({ img, isShown, toggle }) => (
	<Modal
		isShown={isShown}
		hide={toggle}
		headerText={img.title}
		modalContent={<ImageModal pic={img} />}
	/>
)

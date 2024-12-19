import type { FC } from 'react'
import {
	Image
	// PictureInfo,
} from './image-modal.style'
import type { Picture } from '../../types'
import { ImageKitComponent } from '../../features/utils/ImageKitComponent'

interface ImageModal {
	// imgUrl: string | undefined;
	pic: Picture
}

// type DimType = {
//   height: number;
//   width: number;
//   isPortrait: boolean;
// }

// const loadImage = (
//   setImageDimensions: React.Dispatch<DimType>,
//   imageUrl: string) => {
//   const img = document.createElement('img')
//   img.src = imageUrl && imageUrl

//   img.onload = () => {
//     setImageDimensions({
//       height: img.height,
//       width: img.width,
//       isPortrait: img.width < img.height
//     })
//   }
//   img.onerror = (err) => {
//     console.log('img error')
//     console.error(err)
//   }
// }

export const ImageModal: FC<ImageModal> = ({ pic }) => {
	// const [imageDimensions, setImageDimensions] = useState<DimType | null>()

	// useEffect(() => {
	//   imgUrl && loadImage(setImageDimensions, imgUrl)
	// }, [imgUrl])

	// console.log(imageDimensions)
	// const portrait = imageDimensions ? imageDimensions.isPortrait : false

	// const showInfo = <PictureInfo portrait={portrait}>
	//   {pic.year && `${pic.year}, `}
	//   {pic.content && <p>{pic.content}</p>}
	// </PictureInfo>

	return (
		<>
			<Image>
				<ImageKitComponent url={pic.url} />
				{/* <IKContext urlEndpoint='https://ik.imagekit.io/vrojm7lqh'>
          <IKImage src={pic.url} />
        </IKContext> */}
				{/* {showInfo} */}
			</Image>
		</>
	)
}

import { type FC, useState } from 'react'
import { ImageGrid, type ImageGridProps } from './pictureGalleria.style'
import { useWindowSize } from 'usehooks-ts'
import type { Picture } from '../../../types'
import config from '../../../data/config'
import { useModal } from '../../../hooks/useModal'
import { ImagesInDiv } from '../../../components/atoms/ImagesInDiv'
import { ImagesLinkDiv } from '../../../components/atoms/ImagesLinkDiv'
import { Modal } from '../../../components/modal/modal'
import { ImageModal } from '../../../components/image-modal/image-modal'
import { formatUrl } from '../../../components/atoms/utils'


interface PictureMediaProps extends ImageGridProps {
  imageList: Picture[]
}

const picFolder = config.IMAGES_BIG_URL as string

export const PictureGalleria: FC<PictureMediaProps> =
  ({ imageList, width, height }) => {
    const { isShown, toggle } = useModal()
    const [img, setImg] = useState<Picture>()
    const { width: winWidth } = useWindowSize()

    const mobile = winWidth < 768

    const handleClick = (imgSrc: Picture): void => {
      setImg(imgSrc)
      toggle()
    }

    return (
      <>
        <ImageGrid width={width} height={height}>

          {mobile &&
            <ImagesInDiv
              data={imageList}
              url={picFolder}
            />
          }

          {!mobile &&
            <ImagesLinkDiv
              data={imageList}
              url={picFolder}
              onDivClick={(item) => handleClick(item)}
            />
          }

        </ImageGrid>

        {
          img &&
          <Modal
            isShown={isShown}
            hide={toggle}
            headerText={img.title}
            modalContent={
              <ImageModal
                imgUrl={formatUrl(picFolder, img.image)}
                pic={img}
              />
            }
          />
        }
      </>
    )
  }

// {
//   <ImageModal
// imgUrl={formatUrl(picFolder, img.image)} message={img.content} />
// }
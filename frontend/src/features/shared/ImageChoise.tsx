import { formatUrl } from "../../components/atoms/utils"
import { ArticlePicture } from "../../components/dashboard/components/Dashboard.styles"
import config from "../../data/config"
import type { Picture } from "../../types"
import { ChooseButton } from "./chooseImg.styles"

type Props = {
  handleChoise: (id: number) => void
  picture: Picture
  btnTxt: string
  btnColor: string
}

const picFolder = config.IMAGES_BIG_URL as string

export default function ImageChoise(props: Props) {
  const { 
    handleChoise, 
    picture, btnTxt, btnColor } = props
  const { id, image, title } = picture
  const picSrc = formatUrl(picFolder, image)

  const handleCheck = () => {
    handleChoise(id)
  }

  return (
    <ArticlePicture style={{ height: '13rem'
      //  position: 'relative', zIndex: '-1'
       }}>
      <div>
        <img src={picSrc} alt={title} />
      </div>
      {/* <details>
        <summary>{title}</summary>
        <p>{picture.year}</p>
        <p>{picture.content}</p>
      </details> */}
      <ChooseButton
        $color={btnColor}
        $pd='5px'
        onClick={handleCheck}
      >
        {btnTxt}
      </ChooseButton>
    </ArticlePicture>
  )
}
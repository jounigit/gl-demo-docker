import { SmallButton } from "../../components/atoms/Button"
import { ArticlePicture } from "../../components/dashboard/components/Dashboard.styles"
import type { Picture } from "../../types"
import { ImageWithTooltipInfo } from "./ImageWithTooltipInfo"

type Props = {
  handleChoise: (id: number) => void
  picture: Picture
  btnTxt: string
  btnColor: string
}

export default function ImageChoise(props: Props) {
  const { handleChoise, picture, btnTxt, btnColor } = props
  const { id } = picture

  const handleCheck = () => {
    handleChoise(id)
  }

  return (
    <ArticlePicture style={{
      height: '13rem'
    }}>
      <div>
        {ImageWithTooltipInfo(picture)}
      </div>
      <SmallButton color={btnColor} onClick={handleCheck}>
        {btnTxt}
      </SmallButton>
    </ArticlePicture>
  )
}

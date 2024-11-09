import { FadeDiv } from "../components/atoms"
import { AlbumList } from "../features/album/components/AlbumList"

const GalleriaPage = (): JSX.Element => {
  return (
    <FadeDiv timein="0.3s">
      <AlbumList />
    </FadeDiv>
  )
}

export default GalleriaPage


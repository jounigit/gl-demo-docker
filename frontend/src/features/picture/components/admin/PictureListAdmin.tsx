import { PictureListItemAdmin } from './PictureListItemAdmin'
import { usePictures } from '../../usePicture'
import { GridImgArray, ImageArrBox } from '../../../shared/GridImageArray.styles'

export const PictureListAdmin = () => {
  const { data } = usePictures()

  const showdata = data ?
    data.map(p => <PictureListItemAdmin key={p.id} picture={p} />) :
    <h4>no images yet.</h4>

  return (
    <ImageArrBox>
      <GridImgArray $width={200} $imgheight={200}>
        {showdata}
      </GridImgArray>
    </ImageArrBox>
  )
}
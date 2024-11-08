import { PictureListItemAdmin } from './PictureListItemAdmin'
import { usePictures } from '../../usePicture'
import { ImgContainerDb, ImgGridDb } from '../../../../components/dashboard/components/Dashboard.styles'

export const PictureListAdmin = () => {
  const { data } = usePictures()

  const showdata = data ?
    data.map(p => <PictureListItemAdmin key={p.id} picture={p} />) :
    <h4>no images yet.</h4>

  return (
    <ImgContainerDb>
      <ImgGridDb $width={200} $imgheight={200}>
        {showdata}
      </ImgGridDb>
    </ImgContainerDb>
  )
}
import { useParams } from 'react-router-dom'
import { useAlbum } from '../../useAlbum'
import { usePictures } from '../../../picture/usePicture'
import { useAddAlbumPicture, useAlbumPictures, useDeleteAlbumPicture } from '../../../albumpictures/useAlbumPictures'
import { useGoBack } from '../../../../hooks/useGoBack'
import { addPictureToAlbum, deletePictureFromAlbum } from '../../../albumpictures'
import { isPictureArray } from '../../../../types'
import { Button } from '../../../../components/atoms/Button'
import ImageChoise from '../../../utils/ImageChoise'
import { Divider } from '../../../../styles/styles'
import { ImgContainerDb, ImgGridDb } from '../../../../components/dashboard/components/Dashboard.styles'

const ChoosePictures = () => {
  const params = useParams()
  const albumId = Number(params.id)
  const { data: Album } = useAlbum(albumId)
  const { data: Pictures } = usePictures()
  const { data: AllAlbumPics } = useAlbumPictures()
  const { mutate: addPicture } = useAddAlbumPicture()
  const { mutate: deleteAPic } = useDeleteAlbumPicture()
  const goBack = useGoBack()

  if (Pictures && AllAlbumPics && Album) {
    
    const { title, pictures: albumPics } = Album
    console.log({Album, albumPics})
    // ::::::::::: actions ::::::::::::::::::::::::: //
    const handleSelected = addPictureToAlbum(albumId, addPicture)

    const handleDelete =
      deletePictureFromAlbum(albumId, deleteAPic)

    // ::::::::: handle pictures ::::::::::::::::: //
    const notAlbumPics = albumPics === undefined || albumPics.length === 0 ?
    Pictures :
    Pictures.map((pic) =>
      albumPics.some((aPic) => aPic.id === pic.id) ?
        null :
        pic)
      .filter(p => p !== null)

    const chosenPics = albumPics.map((p) =>
      <div key={p.id}>
        <ImageChoise
          picture={p}
          btnTxt='Poista kuva'
          btnColor='red'
          handleChoise={handleDelete}
        />
      </div>
    )

    const chooseablePics = isPictureArray(notAlbumPics) &&
      notAlbumPics.map((p) =>
        <div key={p.id}>
          <ImageChoise
            picture={p}
            btnTxt='Valitse kuva'
            btnColor='green'
            handleChoise={handleSelected}
          />
        </div>
      )

    const showChosen = albumPics.length ? chosenPics : <h4>No pictures yet.</h4>

    // :::::::::::::::::::::::::::::::::::: //
    return (
      <>
        <Button onClick={goBack}>...takaisin</Button>

        <h2 style={{ marginLeft: '20px' }}>
          {title} <span className='h3'>- valitse kuvia</span>
        </h2>

        <Divider />

        <h4 style={{ margin: '10px 0 0 20px' }}>
          VALITUT KUVAT:
        </h4>
        <ImgContainerDb>
          <ImgGridDb $width={180} $imgheight={180} $gap='.8rem'>
            {showChosen}
          </ImgGridDb>
        </ImgContainerDb>

        <Divider />

        <h4 style={{ marginLeft: '20px' }}>
          VALITTAVAT KUVAT:
        </h4>
        <ImgContainerDb>
          <ImgGridDb $width={190} $imgheight={160}>
            {chooseablePics}
          </ImgGridDb>
        </ImgContainerDb>
      </>
    )
  }
  return <p>No data here.</p>
}

export default ChoosePictures

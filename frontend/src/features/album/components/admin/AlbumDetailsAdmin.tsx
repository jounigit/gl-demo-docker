import { type FC, Fragment } from 'react'
import { PictureGalleria } from '../../../picture/components/PictureGalleria'
import { isPictureArray, type Album } from '../../../../types'
import { DetailsImgBox, DetailsText, DetailsTitle } from '../../../../styles/styles'

interface Props {
  album: Album
}

export const AlbumDetailsAdmin: FC<Props> = (props) => {

  const { title, content, year, pictures } = props.album

  console.log({ pictures })

  const images = isPictureArray(pictures) &&
    <DetailsImgBox>
      <PictureGalleria
        imageList={pictures}
        $gridwidth={150}
        $imgheight={150}
      />
    </DetailsImgBox>

  return (
    <Fragment>
      <DetailsTitle>
        <h2>{title}</h2>
      </DetailsTitle>
      <h4>{year}</h4>
      <DetailsText>
        {content}
      </DetailsText>
      {images}
    </Fragment>
  )
}

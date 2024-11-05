import { type FC, Fragment } from 'react'
import { PictureGalleria } from '../../../picture/components/PictureGalleria'
import type { Album } from '../../../../types'
import { DetailsImgBox, DetailsText, DetailsTitle } from '../../../../styles/styles'

interface Props {
  album: Album
}

export const AlbumDetailsAdmin: FC<Props> = (props) => {

  const { title, content, year, pictures } = props.album

  const images = !pictures ? <p>no pics</p> :
    <DetailsImgBox>
      <PictureGalleria
        imageList={pictures}
        width={150}
        height={150}
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

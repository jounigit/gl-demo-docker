import { type FC, Fragment } from 'react'
import type { Album } from '../../../types';
import {
  DetailsImgBox,
  DetailsImgBoxTwoColumn,
  DetailsInfoTxt,
} from '../../../styles/styles';
import { PictureGalleria } from '../../picture/components/PictureGalleria';

interface Props {
  album: Album
  full?: boolean;
}

export const AlbumDetails: FC<Props> = ({ album }) => {
  const isAlbumContent = !!album.content
  console.log({ isAlbumContent })
  const galleria = <PictureGalleria
    imageList={album.pictures}
    $gridwidth={250}
    $imgheight={250}
  />

  const imagesOneColumn =
    <DetailsImgBox>
      {galleria}
    </DetailsImgBox>

  const imagesTwoColumn =
    <DetailsImgBoxTwoColumn>
      {galleria}
    </DetailsImgBoxTwoColumn>

  const images = isAlbumContent ? imagesTwoColumn : imagesOneColumn

  return (
    <Fragment>
      {images}

      <DetailsInfoTxt>
        <h2>{album.title}</h2>
        <p>{album.year}</p>
        <p>{album.content}</p>
      </DetailsInfoTxt>
    </Fragment>
  )
}
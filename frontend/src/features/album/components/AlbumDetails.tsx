import { type FC, Fragment } from 'react'
import type { Album } from '../../../types';
import { DetailsImgBox, DetailsText, DetailsTitle } from '../../../styles/styles';
import { PictureGalleria } from '../../picture/components/PictureGalleria';

interface Props {
  album: Album
  full?: boolean;
}

export const AlbumDetails: FC<Props> = ({ album }) => {

  const images =
    <DetailsImgBox>
      <PictureGalleria
        imageList={album.pictures}
        width={250}
        height={250}
      />
    </DetailsImgBox>

  return (
    <Fragment>
      <DetailsTitle>
        <h2>{album.title}</h2>
      </DetailsTitle>
      {images}
      <DetailsText>
        {album.content}
      </DetailsText>
    </Fragment>
  )
}
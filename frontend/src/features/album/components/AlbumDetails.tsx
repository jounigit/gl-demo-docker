/** 
 * the AlbumDetails component is designed to display an album's pictures in a flexible layout, 
 * either in a single-column or two-column format, 
 * depending on whether additional content is provided. 
 * The use of styled components and a separate PictureGalleria 
 * component allows for a clean and modular design.
 * */
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
  isContent?: boolean;
}

export const AlbumDetails: FC<Props> = (props) => {
  const { album, isContent } = props
  const galleria = <PictureGalleria
    imageList={album.pictures}
    $gridwidth={250}
    $imgheight={250}
  />

  /** if album has no content pictures takes all space  */
  const imagesOneColumn =
    <DetailsImgBox>
      {galleria}
    </DetailsImgBox>

  /** if album has content show content and pictures side by side */
  const imagesTwoColumn =
    <DetailsImgBoxTwoColumn>
      {galleria}
    </DetailsImgBoxTwoColumn>

  if (isContent) {
    return (
      <Fragment>
        {imagesTwoColumn}
        <DetailsInfoTxt>
          <h2>{album.title}</h2>
          <p>{album.year}</p>
          <p>{album.content}</p>
        </DetailsInfoTxt>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {imagesOneColumn}
      <DetailsInfoTxt>
        <h2>{album.title}</h2>
        <p>{album.year}</p>
        <p>{album.content}</p>
      </DetailsInfoTxt>
    </Fragment>
  )
}
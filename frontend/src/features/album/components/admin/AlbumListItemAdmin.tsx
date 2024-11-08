import { type FC, Fragment } from 'react'
import styled from 'styled-components'
import { ActionLinks } from './ActionLinks'
import { AlbumDelete } from './AlbumDelete'
import { ListItemImageGrid, ListItemInfoText } from '../../../../styles/styles'
import { colors } from '../../../../styles/theme'
import { MOBILE } from '../../../../styles'
import type { Album } from '../../../../types'
import config from '../../../../data/config'
import { useModal } from '../../../../hooks/useModal'
import { ImageInDiv } from '../../../../components/atoms/ImageInDiv'
import { Modal } from '../../../../components/modal/modal'

const ImageItem = styled(ListItemImageGrid)`
    grid-template-columns: 1fr;
    margin: 0.5rem 1rem 0.5rem 0;
`

const Content = styled.div`
    padding: 1.5rem;
`
const Links = styled.div`
`
const Container = styled.div`
  background: ${colors.grey1};
  border: 1px solid grey;

  @media ${MOBILE} {
    display: grid;  
    grid-template-columns: 1fr 2fr 1fr;
  }
`

interface ListProps {
  album: Album,
}

const picFolder = config.IMAGES_THUMB_URL as string

export const AlbumListItemAdmin: FC<ListProps> = (props) => {
  const { isShown, toggle } = useModal()
  const { id, title, slug, pictures } = props.album
  
  // ******************************************************************* //
  const textForGalleria = (
    <h4>
      {pictures.length}
      {' '}
      kuvaa
    </h4>
  )

  const showFirstPic = pictures[0] ?
    <ImageInDiv data={pictures[0]} url={picFolder} /> :
    <h4 style={{ paddingLeft: '40px' }}>no images yet.</h4>
    console.log({pictures})
  // ****************** actions *********************************** //
  const {
    link, linkUpdate, linkRemove, linkPictures
  } = ActionLinks({ id, slug, toggle })

  // **************** return ***************************************** //
  return (
    <Fragment>

      <Container data-cy='listItem'>
        <ImageItem width={150} height={150}>
          {showFirstPic}
        </ImageItem>

        <Content>
          <h3>{title}</h3>
          <ListItemInfoText>
            {textForGalleria}
          </ListItemInfoText>
        </Content>

        <section>
          <Links>
            {link}
          </Links>
          <Links>
            {linkUpdate}
          </Links>
          <Links>
            {linkPictures}
          </Links>
          <Links>
            {linkRemove}
          </Links>
        </section>
      </Container>

      <Modal
        isShown={isShown}
        hide={toggle}
        headerText='Albumin poisto'
        modalContent={
          <AlbumDelete id={id} title={title} toggle={toggle} />
        }
      />
    </Fragment>
  )
}

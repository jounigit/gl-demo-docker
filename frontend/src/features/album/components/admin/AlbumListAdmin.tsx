import { AlbumListItemAdmin } from './AlbumListItemAdmin'
import { useAlbums } from '../../useAlbum'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 1rem;
`

const AlbumListAdmin = (): JSX.Element => {
  const { data: Albums } = useAlbums()

  const showAlbums = Albums?.length ?
    Albums.map(a => <AlbumListItemAdmin key={a.id} album={a} />) :
    <p>no albums yet.</p>

  return (
    <Wrapper>
      {showAlbums}
    </Wrapper>
  )
}

export default AlbumListAdmin
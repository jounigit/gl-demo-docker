import { getAll } from '../../../services/apiService'
import { ListContainer } from '../../../styles/styles'
import type { Album } from '../../../types'
import { AlbumListItem } from './AlbumListItem'
// import { fetchAlbumList } from '../useAlbum'
import { useSuspenseQuery } from '@tanstack/react-query'

export const AlbumList = (): JSX.Element => {
  const { data } = useSuspenseQuery({
    queryKey: ['albums'],
    queryFn: async () => await getAll<Album>('albums')
  })

  const showAlbums = data.length ?
    data.map(a => <AlbumListItem key={a.id} album={a} />) :
    <h4>no albums yet.</h4>

  return (
    <ListContainer>
      {showAlbums}
    </ListContainer>
  )
}

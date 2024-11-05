import { useParams } from 'react-router-dom'
import { AlbumDetails } from './AlbumDetails'
import { useAlbumBySlug } from '../useAlbum'
import { DetailsContainer } from '../../../styles/styles'

const Album = (): JSX.Element => {
  const { slug } = useParams() as { slug: string }
  const { data } = useAlbumBySlug(slug)

  const showData = data ?
    <AlbumDetails album={data} full /> :
    <p>No data yet.</p>

  return (
    <DetailsContainer data-cy='albumDetails'>
      {showData}
    </DetailsContainer>
  )
}

export default Album

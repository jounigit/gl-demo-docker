import { useParams } from 'react-router-dom'
import { AlbumDetails } from './AlbumDetails'
import { useAlbumBySlug } from '../useAlbum'
import { DetailsContainer, DetailsContainerForTwoCol } from '../../../styles/styles'

const Album = (): JSX.Element => {
  const { slug } = useParams() as { slug: string }
  const { data: album } = useAlbumBySlug(slug)

  if (album === undefined) {
    return (
      <DetailsContainer data-cy='albumDetails'>
        <h4>No data yet.</h4>
      </DetailsContainer>
    )
  }

  if (album.content) {
    return (
      <DetailsContainerForTwoCol data-cy='albumDetails'>
        <AlbumDetails album={album} isContent />
      </DetailsContainerForTwoCol>
    )
  }

  return (
    <DetailsContainer data-cy='albumDetails'>
      <AlbumDetails album={album} />
    </DetailsContainer>
  )
}

export default Album
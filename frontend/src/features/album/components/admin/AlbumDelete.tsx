import { RedButton } from '../../../../components/atoms'
import { DeleteWrapper } from '../../../../styles/styles'
import { useDeleteAlbum } from '../../useAlbum'
import { useEffect } from 'react'

type Props = {
  id: number,
  title: string
  toggle: () => void
}

export const AlbumDelete = ({ id, title, toggle }: Props): JSX.Element => {
  const { status, mutate: DeleteAlbum } = useDeleteAlbum()

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      toggle()
    }
  }, [status, toggle])

  /************** handle remove mutation ***********************/
  const remove = (): void => {
    DeleteAlbum(id)
  }

  /************************************************************/
  return (
    <DeleteWrapper>
      <h3>Haluatko poistaa albumin:</h3>
      <h4>{title}</h4>
      <RedButton
        size={0.1}
        onClick={() => remove()}
      >
        Poista album
      </RedButton>
    </DeleteWrapper>
  )
}
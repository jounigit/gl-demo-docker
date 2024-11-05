import { type FC, useEffect, } from 'react'
import AlbumForm from './AlbumForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlbum, useUpdateAlbum } from '../../useAlbum'
import type { FormDataAlbum, UpdateAlbum } from '../../../../types'

export const AlbumUpdate: FC = () => {
  const params = useParams()
  const id = Number(params.id)
  const { data: CurrentAlbum } = useAlbum(id)
  const { status, mutate } = useUpdateAlbum()
  const navigate = useNavigate()

  /*****************************************************/
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      navigate('/dashboard/albums')
      // goBack()
    }
  }, [navigate, status])

  /************** handle update *************************/
  const handleData = (data: FormDataAlbum) => {
    const album: UpdateAlbum = data
    mutate({ id, album })
  }

  /************** return *************************/
  return (
      <AlbumForm
        handleData={handleData}
        album={CurrentAlbum}
        formName='PÄIVITÄ ALBUMI'
      />
  )

  /******************************************************/

}
import { type FC, useEffect } from 'react'
import { useCreateAlbum } from '../../useAlbum'
import AlbumForm from './AlbumForm'
import { useNavigate } from 'react-router-dom'
import { isUser, type NewAlbum } from '../../../../types'
import { getUser } from '../../../../store/userStore'

export const AlbumCreate: FC = () => {
  const { mutate, status } = useCreateAlbum()
  const navigate = useNavigate()
  const user = getUser()

  if (isUser(user)) {
  /*****************************************************/
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      navigate('/dashboard/albums')
    }
  }, [navigate, status])

  /************** handle mutation *************************/
  const handleData = (data: NewAlbum) => {
    mutate(data)
  }

  /************** return *************************/
  return (
    <AlbumForm
      handleData={handleData}
      formName='UUSI ALBUMI'
    />
  )
  /*****************************************************/
  }

  navigate('/login')

}
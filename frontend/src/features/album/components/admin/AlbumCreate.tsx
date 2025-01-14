import { useEffect, type FC } from "react"
import { getUser } from '@/store/userStore'
// import { isUser } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useCreateAlbum } from '../../useAlbum'
import type { NewAlbum } from "@/types"
import AlbumForm from './AlbumForm'



export const AlbumCreate: FC = () => {
	const { mutate, status } = useCreateAlbum()
	const navigate = useNavigate()
	const user = getUser()
	console.log({user})

	// if (isUser(user)) {
	// 	navigate('/login')
	// 	return null
	// }

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

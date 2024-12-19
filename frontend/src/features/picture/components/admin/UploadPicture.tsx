import { useNavigate } from 'react-router-dom'
import FileUploader from './FileUploader'
import toast from 'react-hot-toast'
import { apiClient } from '@/services/http-common'

export const UploadPicture = (): JSX.Element => {
	const navigate = useNavigate()

	const handleFile = async (file: File) => {
		console.log({ file })
		const formData = new FormData()
		formData.append('image', file)

		try {
			const promise = apiClient.post(
				'pictures/upload',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)

			const { data } = await toast.promise(promise, {
				loading: 'Loading...',
				success: 'Picture stored successfully!',
				error: (e) =>
					`Failed to store picture -\n${e.message}`
			})

			console.log({ data })
			toast.success('Picture stored successfully.')
			navigate(`/dashboard/pictures/update/${data.data.id}`)
		} catch (error) {
			console.error()
		}
	}

	return <FileUploader handleFile={handleFile} />
}

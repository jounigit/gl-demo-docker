import { useNavigate } from 'react-router-dom'
import FileUploader from './FileUploader'
import toast from 'react-hot-toast'
import { apiClient } from '../../../../services/http-common'

export const UploadPicture = (): JSX.Element => {
  const navigate = useNavigate()

  const handleFile = async (file: File) => {
    console.log({ file })
    const formData = new FormData()
    formData.append('image', file)

    try {
      const promise = apiClient.post('pictures/upload', formData)

      const { data } = await toast.promise(promise, {
        loading: 'Loading...',
        success: 'Picture stored successfully!',
        error: (e) => `Failed to store picture -\n${e.message}`,
      })

      toast.success('Picture stored successfully.')
      navigate(`/dashboard/pictures/update/${data.data.id}`)

    } catch (error) {
      console.error()
    }
  }

  // const handleFile = (file: File) => {
  //   const res = createPicture({picture: file})
  // }


  /************** return *************************/
  return (
    <FileUploader handleFile={handleFile} />
  )
}

// try {
//   const { data } = await apiClient.post('upload', formData)
//   console.log('UPLOAD RSEPONSE: ', data.data)
//   toast.success('Picture stored successfully.')
//   navigate(`/dashboard/pictures/update/${data.data.id}`)
// } catch (error) {
//   console.error()
// }

// const { mutate, status, error } = useCreatePicture()
// const navigate = useNavigate()

// /************** handle mutation *************************/
// if (status === 'error') {
//   return <ErrorHandler error={(error as Error)} />
// }

// useEffect(() => {
//   if (status === 'success') {
//     toast.success('Picture stored successfully.')
//     navigate('/dashboard/pictures')
//   }
// }, [status])

// try {
//   axios.post(`${baseURL}/upload`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
//   refetch()
//   navigate('/dashboard/pictures')
// } catch (error) {
//   console.error()
// }

// try {
//   createPicture({ image: file })

//   refetch()
//   navigate('/dashboard/pictures')
// } catch (error) {
//   console.error()
// }
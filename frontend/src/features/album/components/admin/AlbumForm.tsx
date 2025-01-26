import {
	Button,
	GreenButton
} from '@/components/atoms/Button'
import { useGoBack } from '@/hooks/useGoBack'
import { FormContainer } from '@/styles'
import {
	Form,
	Input,
	InputWrapper,
	Label
} from '@/styles/styles'
import type { Album, FormDataAlbum } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import {
	type SubmitHandler,
	useForm
} from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'

const schema = Yup.object().shape({
	title: Yup.string().required()
})

type Inputs = {
	title: string
	year?: number
	// content?: string
}

type Props = {
	handleData: (data: FormDataAlbum) => void
	album?: Album
	formName: string
}

function AlbumForm({ handleData, album, formName }: Props) {
	// const [content, setContent] = useState(album?.content ? album.content : '')
	const 
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		values: album
	})
	const goBack = useGoBack()

    	const cntxx = album?.content ? album.content : ''
	console.log({ cntxx })
	//************* handle submit *************/
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log({ data })
    	const cnt = content ? content : ''

		const newAlbum = {
			title: data.title,
			year: data?.year,
			content: cnt
		}

		handleData(newAlbum)
		reset()
	}

	  //************* handle content *************/
	  const onChange = (value: string) => {
		setContent(value)
	  }

	//************* return *******************/
	return (
		<>
			<Button onClick={goBack}>...takaisin</Button>

			<FormContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<h3 style={{ color: 'white' }}>{formName}</h3>

					<InputWrapper>
						{/* ........... */}
						<Label>Title</Label>
						<Input {...register('title')} required />
						{errors.title?.message}

						{/* ........... */}
						<Label>Year</Label>
						<Input {...register('year')} />
						{errors.year?.message}

						{/* ........... */}
						<Label>Content</Label>
						<div className='' style={{ background: 'white' }}>
							<ReactQuill
								theme="snow"
								value={content}
								onChange={onChange}
							 />
						</div>
					</InputWrapper>

					<GreenButton type='submit' size={0.5}>
						Lähetä
					</GreenButton>
				</Form>
			</FormContainer>
		</>
	)
}

export default AlbumForm

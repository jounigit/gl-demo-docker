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
import {
	type SubmitHandler,
	useForm
} from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
	title: Yup.string().required()
})

type Inputs = {
	title: string
	year?: number
	content?: string
}

type Props = {
	handleData: (data: FormDataAlbum) => void
	album?: Album
	formName: string
}

function AlbumForm({ handleData, album, formName }: Props) {
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

	//************* handle submit *************/
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log({ data })

		const newAlbum = {
			title: data.title,
			year: data?.year,
			content: data?.content
		}

		handleData(newAlbum)
		reset()
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
						<Input {...register('content')} />
						{errors.content?.message}
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

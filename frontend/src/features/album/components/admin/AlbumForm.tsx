import { useRef, useState } from 'react'
import {
	type SubmitHandler,
	FormProvider,
	useForm
} from 'react-hook-form'
import { useGoBack } from '@/hooks/useGoBack'
import {
	Button,
	GreenButton
} from '@/components/atoms/Button'
import { FormContainer } from '@/styles'
import {
	Form,
	FormWrapper,
	Input,
	InputWrapper,
	Label
} from '@/styles/styles'
import type { Album, FormDataAlbum, FormInputs, FormUnionProps } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { JoditContentEditor } from '@/features/utils/JoditContentEditor'
import { titleSchema } from '@/features/utils/formSchemas'

function AlbumForm({ handleData, object, formName }: FormUnionProps<FormDataAlbum, Album>) {
	const editorRef = useRef(null)
	const [content, setContent] = useState('')
	const goBack = useGoBack()
	const formMethods = useForm<FormInputs>({
		resolver: yupResolver(titleSchema),
		values: object 
	})

	const { control, register, handleSubmit, reset, formState: { errors } } = formMethods

	console.log({ object })
	//************* handle submit *************/
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log({ data })

		const newAlbum = {
			title: data.title,
			year: data?.year,
			content: content
		}

		handleData(newAlbum)
		reset()
	}

	//************* return *******************/
	return (
		<>
			<Button onClick={goBack}>...takaisin</Button>

			<FormContainer>
				<FormWrapper>
					<h3 style={{ color: 'white' }}>{formName}</h3>

					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormProvider {...formMethods}>
							<InputWrapper>
								{/* ........... */}
								<Label>Title</Label>
								<Input {...register('title')} required />
								{errors.title?.message}

								{/* ........... */}
								<Label>Year</Label>
								<Input type='number' {...register('year')} />
								{errors.year?.message}

								{/* ........... */}
								<Label>Content rtf</Label>
								{JoditContentEditor({ control, editorRef, setContent, buttons: 'SEMI' })}
							</InputWrapper>
						</FormProvider>
						<GreenButton type='submit' size={0.5}>
							Lähetä
						</GreenButton>
					</Form>
					
				</FormWrapper>
			</FormContainer>
		</>
	)
}

export default AlbumForm

import { useRef, useState } from 'react'
import {
	type SubmitHandler,
	type Control,
	Controller,
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
	Input,
	InputWrapper,
	Label
} from '@/styles/styles'
import type { Album, FormDataAlbum, FormInputs } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import JoditEditor from 'jodit-react'

const schema = Yup.object().shape({
	title: Yup.string().required()
})

// type Inputs = {
// 	title: string
// 	year?: number
// 	content?: string
// }

type Props = {
	handleData: (data: FormDataAlbum) => void
	album?: Album
	formName: string
}

function AlbumForm({ handleData, album, formName }: Props) {
	const formMethods = useForm<FormInputs>({
		resolver: yupResolver(schema),
		values: album
	})
	const editorRef = useRef(null);
	const [content, setContent] = useState('')
	const goBack = useGoBack()

	const { control, register, handleSubmit, reset, formState: {errors} } = formMethods

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

	console.log({ content })
	//************* return *******************/
	return (
		<>
			<Button onClick={goBack}>...takaisin</Button>

			<FormContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormProvider {...formMethods}>
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
							<Label>Content rtf</Label>
							{joditTextEditor(control, editorRef, setContent)}

						</InputWrapper>
					</FormProvider>

					<GreenButton type='submit' size={0.5}>
						Lähetä
					</GreenButton>
				</Form>
			</FormContainer>
		</>
	)
}

export default AlbumForm

function joditTextEditor(
	control:  Control<FormInputs, unknown>, 
	editorRef: React.MutableRefObject<null>, 
	setContent: React.Dispatch<React.SetStateAction<string>>) {
	return <Controller
		name="content"
		control={control}
		defaultValue=""
		render={({ field: { value } }) => (
			<JoditEditor
				ref={editorRef}
				value={value}
				onBlur={(newContent) => setContent(newContent)}
				onChange={() => { } }
				config={{
					buttons: [
						'bold', 
						'italic',
						'underline',
						'strikethrough',
						'|',
						'font',
						'fontsize',
						'|',
						'paragraph',
						'ul',
						'ol',
						'|',
						'table',
						'link',
						'|',
						'clean',
						'source',
					],
					readonly: false,
					toolbarAdaptive: false,
					placeholder: 'Start typing ööö...',
				}}
				// biome-ignore lint/a11y/noPositiveTabindex: <explanation>
				tabIndex={1} />
		)} />
}
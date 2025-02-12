<<<<<<< HEAD
import { useRef, useState } from 'react'
import {
	type SubmitHandler,
	type Control,
	Controller,
	FormProvider,
	useForm
} from 'react-hook-form'
import { useGoBack } from '@/hooks/useGoBack'
=======
>>>>>>> v-20-tinymce
import {
	Button,
	GreenButton
} from '@/components/atoms/Button'
<<<<<<< HEAD
=======
import { useGoBack } from '@/hooks/useGoBack'
>>>>>>> v-20-tinymce
import { FormContainer } from '@/styles'
import {
	Form,
	Input,
	InputWrapper,
<<<<<<< HEAD
	Label
} from '@/styles/styles'
import type { Album, FormDataAlbum, FormInputs } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import JoditEditor from 'jodit-react'
=======
	Label,
	Textarea
} from '@/styles/styles'
import type { Album, FormDataAlbum } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	type SubmitHandler,
	useForm
} from 'react-hook-form'
import * as Yup from 'yup'
>>>>>>> v-20-tinymce

const schema = Yup.object().shape({
	title: Yup.string().required()
})

<<<<<<< HEAD
// type Inputs = {
// 	title: string
// 	year?: number
// 	content?: string
// }
=======
type Inputs = {
	title: string
	year?: number
	content?: string
}
>>>>>>> v-20-tinymce

type Props = {
	handleData: (data: FormDataAlbum) => void
	album?: Album
	formName: string
}

function AlbumForm({ handleData, album, formName }: Props) {
<<<<<<< HEAD
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
=======
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
>>>>>>> v-20-tinymce
		console.log({ data })

		const newAlbum = {
			title: data.title,
			year: data?.year,
<<<<<<< HEAD
			content: content
=======
			content: data?.content
>>>>>>> v-20-tinymce
		}

		handleData(newAlbum)
		reset()
	}

<<<<<<< HEAD
	console.log({ content })
=======
>>>>>>> v-20-tinymce
	//************* return *******************/
	return (
		<>
			<Button onClick={goBack}>...takaisin</Button>

			<FormContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
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
=======
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
						<Textarea {...register('content')} />
						{errors.content?.message}
					</InputWrapper>
>>>>>>> v-20-tinymce

					<GreenButton type='submit' size={0.5}>
						Lähetä
					</GreenButton>
				</Form>
			</FormContainer>
		</>
	)
}

export default AlbumForm
<<<<<<< HEAD

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
=======
>>>>>>> v-20-tinymce

import {
<<<<<<< HEAD
	FormProvider,
=======
>>>>>>> v-20-tinymce
	type SubmitHandler,
	useForm
} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
<<<<<<< HEAD
import { useRef, useState } from 'react'
import styled from 'styled-components'
import type { FormInputs, Picture, UpdatePicture } from '@/types'
=======
import { useState } from 'react'
import styled from 'styled-components'
import type { Picture, UpdatePicture } from '@/types'
>>>>>>> v-20-tinymce
import { RenderImageInDiv } from '@/components/atoms/RenderImageInDiv'
import { FormContainer } from '@/styles'
import {
	Form,
	Input,
	InputWrapper,
<<<<<<< HEAD
	Label
} from '@/styles/styles'
import { GreenButton } from '@/components/atoms'
import { textEditorMin } from '@/features/utils/TextEditorMin'
=======
	Label,
	Textarea
} from '@/styles/styles'
import { GreenButton } from '@/components/atoms'
>>>>>>> v-20-tinymce

export const ImageDiv = styled.div`
    display: block;
    height: 150px;
    width: auto;
    margin-bottom: 20px;
    border: 1px solid red;
`

const schema = yup.object().shape({
	title: yup.string().required(),
<<<<<<< HEAD
	// content: yup
	// 	.string()
	// 	.min(20, 'Content must be at least 20 characters long')
})

=======
	content: yup
		.string()
		.min(20, 'Content must be at least 20 characters long')
})

type Inputs = {
	title: string
	year?: number
	content?: string
}

>>>>>>> v-20-tinymce
type Props = {
	handleData: (data: UpdatePicture) => void
	picture?: Picture
	formName: string
}

<<<<<<< HEAD
function PictureForm({ handleData, picture, formName }: Props) {
	const formMethods = useForm<FormInputs>({
		resolver: yupResolver(schema),
		values: picture
	})
	const editor = useRef(null);
	const [content, setContent] = useState('')

	const { control, register, handleSubmit, reset, formState: {errors} } = formMethods

	const showPic = picture && <RenderImageInDiv data={picture} />

	// console.log({ content })
	//************* handle submit *************/
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log({ data })

=======
function PictureForm({
	handleData,
	picture,
	formName
}: Props) {
	const [content, setContent] = useState(
		picture?.content || ''
	)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>({
		values: picture,
		resolver: yupResolver(schema)
	})

	const showPic = picture && <RenderImageInDiv data={picture} />

	console.log({ picture })
	//************* handle submit *************/
	const onSubmit: SubmitHandler<Inputs> = (data) => {
>>>>>>> v-20-tinymce
		const newPicture = {
			title: data.title,
			year: data?.year,
			content: content
		}

		handleData(newPicture)
		reset()
	}

<<<<<<< HEAD
=======
	//************* handle content *************/
	const onChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setContent(e.target.value)
	}

>>>>>>> v-20-tinymce
	//************* return *******************/
	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{showPic}
<<<<<<< HEAD
				<h3 style={{ color: 'white', marginTop: '20px' }}>
					{formName}
				</h3>
				<FormProvider {...formMethods}>
					<InputWrapper>
						{/* ........... */}
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							{...register('title')}
							required
						/>
						{errors.title?.message}

						{/* ........... */}
						<Label htmlFor='year'>Year</Label>
						<Input
							id='year'
							type='number'
							{...register('year')}
						/>
						{errors.year?.message}

						{/* ........... */}
						<Label htmlFor='content'>Content</Label>
						{ textEditorMin( control, editor, setContent)}
						
					</InputWrapper>
				</FormProvider>
=======

				<h3 style={{ color: 'white', marginTop: '20px' }}>
					{formName}
				</h3>

				<InputWrapper>
					{/* ........... */}
					<Label htmlFor='title'>Title</Label>
					<Input
						id='title'
						{...register('title')}
						required
					/>
					{errors.title?.message}

					{/* ........... */}
					<Label htmlFor='year'>Year</Label>
					<Input
						id='year'
						type='number'
						{...register('year')}
					/>
					{errors.year?.message}

					{/* ........... */}
					<Label htmlFor='content'>Kuvaus</Label>
					<Textarea
						id='content'
						name='content'
						value={content}
						onChange={onChange}
					/>
				</InputWrapper>

>>>>>>> v-20-tinymce
				<GreenButton type='submit' size={0.5}>
					Lähetä
				</GreenButton>
			</Form>
		</FormContainer>
	)
}

export default PictureForm

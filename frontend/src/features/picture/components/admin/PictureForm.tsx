import {
	FormProvider,
	type SubmitHandler,
	useForm
} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import type { FormInputs, Picture, UpdatePicture } from '@/types'
import { RenderImageInDiv } from '@/components/atoms/RenderImageInDiv'
import { FormContainer } from '@/styles'
import {
	Form,
	Input,
	InputWrapper,
	Label
} from '@/styles/styles'
import { GreenButton } from '@/components/atoms'
import { textEditorMin } from '@/features/utils/TextEditorMin'

export const ImageDiv = styled.div`
    display: block;
    height: 150px;
    width: auto;
    margin-bottom: 20px;
    border: 1px solid red;
`

const schema = yup.object().shape({
	title: yup.string().required(),
	// content: yup
	// 	.string()
	// 	.min(20, 'Content must be at least 20 characters long')
})

type Props = {
	handleData: (data: UpdatePicture) => void
	picture?: Picture
	formName: string
}

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

		const newPicture = {
			title: data.title,
			year: data?.year,
			content: content
		}

		handleData(newPicture)
		reset()
	}

	//************* return *******************/
	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{showPic}
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
				<GreenButton type='submit' size={0.5}>
					Lähetä
				</GreenButton>
			</Form>
		</FormContainer>
	)
}

export default PictureForm

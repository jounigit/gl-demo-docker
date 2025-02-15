import { useRef, useState } from 'react'
import {
	type SubmitHandler,
	FormProvider,
	useForm
} from 'react-hook-form'
import {
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
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import type { FormInputs, FormUnionProps, Picture, UpdatePicture } from '@/types'
import { RenderImageInDiv } from '@/components/atoms/RenderImageInDiv'
import { JoditContentEditor } from '@/features/utils/JoditContentEditor'
import { ListItemImageGrid } from '@/features/album/components/album.styles'
import { titleSchema } from '@/features/utils/formSchemas'

const ImageItem = styled(ListItemImageGrid)`
    grid-template-columns: 1fr;
    margin: 0.5rem 1rem 0.5rem 0;
`

function PictureForm({ handleData, object: picture, formName}: 
	FormUnionProps<UpdatePicture, Picture>) {
	const editorRef = useRef(null);
	const [content, setContent] = useState('')
	const formMethods = useForm<FormInputs>({
			resolver: yupResolver(titleSchema),
			values: picture
	})

	const { control, register, handleSubmit, reset, formState: {errors} } = formMethods

	const showPic = picture && 
	<ImageItem width={200} height={200}>
		<RenderImageInDiv data={picture} />
	</ImageItem>

	// console.log({ picture })
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
			<FormWrapper>
				<h3 style={{ color: 'white', marginBottom: '3rem' }}>
					{formName}
				</h3>
				{showPic}

				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormProvider {...formMethods}>
						<InputWrapper>
							{/* ........... */}
							<Label htmlFor='title'>Title</Label>
							<Input {...register('title')} required />
							{errors.title?.message}

							{/* ........... */}
							<Label htmlFor='year'>Year</Label>
							<Input {...register('year')} />
							{errors.year?.message}

							{/* ........... */}
							<Label htmlFor='content'>Kuvaus</Label>
							{JoditContentEditor({control, editorRef, setContent, buttons: 'MINIMAL'})}
						</InputWrapper>
					</FormProvider>
					<GreenButton type='submit' size={0.5}>
						Lähetä
					</GreenButton>
				</Form>
				
			</FormWrapper>
		</FormContainer>
	)
}

export default PictureForm

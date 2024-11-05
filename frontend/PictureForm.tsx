import { type SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import styled from 'styled-components'
import type { Picture, UpdatePicture } from '../../../../types'
import config from '../../../../data/config'
import { ImageInDiv } from '../../../../components/atoms/ImageInDiv'
import { FormContainer } from '../../../../styles'
import { Form, Input, InputWrapper, Label, Textarea } from '../../../../styles/styles'
import { GreenButton } from '../../../../components/atoms'

export const ImageDiv = styled.div`
    display: block;
    height: 150px;
    width: auto;
    margin-bottom: 20px;
    border: 1px solid red;
`

const schema = yup.object().shape({
  title: yup.string().required(),
  year: yup.number().required(),
})

type Inputs = {
  title: string;
  year: number;
  technique?: string;
  size?: string;
  content?: string;
  photographer?: string;
}

type Props = {
  handleData: (data: UpdatePicture) => void
  picture: Picture
  formName: string;
}

const picFolder = config.IMAGES_THUMB_URL as string

function PictureForm({ handleData, picture, formName }: Props) {
  const [content, setContent] = useState(picture?.content || '')
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<Inputs>({
      defaultValues: {
        title: picture?.title || '',
        year: picture?.year || 0,
        technique: picture?.technique || '',
        size: picture?.size || '',
        content: picture?.content || '',
        photographer: picture?.photographer || '',
      },
      resolver: yupResolver(schema),
    })

  const showPic = picture && <ImageInDiv data={picture} url={picFolder} />

  console.log({ picture })
  //************* handle submit *************/
  const onSubmit: SubmitHandler<Inputs> = (data) => {

    const newPicture = {
      title: data.title,
      year: data.year,
      technique: data?.technique,
      size: data?.size,
      content: content,
      photographer: data?.photographer,
    }

    handleData(newPicture)
    reset()
  }

  //************* handle content *************/
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  //************* return *******************/
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {showPic}

        <h3 style={{ color: 'white', marginTop: '20px' }}>{formName}</h3>

        <InputWrapper>

          {/* ........... */}
          <Label>Title</Label>
          <Input
            {...register('title')}
            required
          />
          {errors.title?.message}

          {/* ........... */}
          <Label>Year</Label>
          <Input
            {...register('year')}
            required
          />
          {errors.title?.message}

          {/* ........... */}
          <Label>Technique</Label>
          <Input
            {...register('technique')}
            required
          />
          {errors.title?.message}

          {/* ........... */}
          <Label>Size</Label>
          <Input
            {...register('size')}
            required
          />
          {errors.title?.message}

          {/* ........... */}
          <Label>Kuvaus</Label>
          <Textarea name='content' value={content} onChange={onChange} />

          {/* ........... */}
          <Label>Photographer</Label>
          <Input
            {...register('photographer')}
            required
          />
          {errors.title?.message}

        </InputWrapper>

        <GreenButton type='submit' size={0.5}>Lähetä</GreenButton>
      </Form>
    </FormContainer>
  )
}

export default PictureForm
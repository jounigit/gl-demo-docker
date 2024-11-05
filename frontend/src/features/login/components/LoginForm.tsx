import { type SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { Login } from '../../../types'
import { FormContainer } from '../../../styles'
import { Form, Input, InputWrapper, Label } from '../../../styles/styles'
import { GreenButton } from '../../../components/atoms'

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

type Inputs = {
  email: string;
  password: string;
}

type Props = {
  handleData: (data: Login) => void;
  formName: string;
}

function LoginForm({ handleData, formName }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<Inputs>({ resolver: yupResolver(schema) })

  //************* handle submit *************/
  const onSubmit: SubmitHandler<Inputs> = (data: Login) => {
    console.log({ data })

    const login = {
      email: data.email,
      password: data.password,
    }

    handleData(login)
    reset()
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <h3 style={{ color: 'white' }}>{formName}</h3>

        <InputWrapper>
          <Label>Email</Label>
          <Input
            {...register('email')}
            required
          />
          {errors.email?.message}

          <Label>Password</Label>
          <Input
            {...register('password')}
            required
          />
          {errors.password?.message}

          <GreenButton type='submit' size={0.5}>Login</GreenButton>
        </InputWrapper>

      </Form>
    </FormContainer>)
}

export default LoginForm
import {
	type SubmitHandler,
	useForm
} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { FormUnionProps, Login } from '@/types'
import { FormContainer } from '@/styles'
import { GreenButton } from '@/components/atoms'
import { InputWrapper, Label, Input, Form, FormWrapper } from '@/styles/styles'

const schema = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required()
})

type Inputs = {
	email: string
	password: string
}

// type Props = {
// 	handleData: (data: Login) => void
// 	formName: string
// }

function LoginForm({ handleData, formName }: FormUnionProps<Login>) {
	const formMethods = useForm<Inputs>({ resolver: yupResolver(schema) })

	const {	register, handleSubmit, formState: { errors }, reset } = formMethods

	//************* handle submit *************/
	const onSubmit: SubmitHandler<Inputs> = (data: Login) => {
		console.log({ data })

		const login = {
			email: data.email,
			password: data.password
		}

		handleData(login)
		reset()
	}

	return (
		<FormContainer>
			<FormWrapper>
				<h3 style={{ color: 'white', marginBottom: '15px'  }}>{formName}</h3>
				<h4 style={{ marginBottom: '15px' }}>
					Voit testata sisällön hallintaa näillä tunnuksilla:
				</h4>
				<h4>
					Email: demo@mail.com
					<br />
					Password: demopass
				</h4>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputWrapper>
					<Label>Email</Label>
					<Input {...register('email')} required />
					{errors.email?.message}

					<Label>Password</Label>
					<Input {...register('password')} required />
					{errors.password?.message}

					<GreenButton type='submit' size={0.5}>
						Login
					</GreenButton>
				</InputWrapper>
			</Form>
			</FormWrapper>
				
		</FormContainer>
	)
}

export default LoginForm

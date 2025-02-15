import * as Yup from 'yup'

export const titleSchema = Yup.object().shape({
	title: Yup.string().required()
})

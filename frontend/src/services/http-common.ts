import axios from 'axios'
import config from '../data/config'

const apiUrl = config.API_URL

export const apiClient = axios.create({
	baseURL: apiUrl,
	headers: {
		'Content-Type': 'application/json',
	},
})

apiClient.defaults.headers.common['Content-Type'] =
	'multipart/form-data'

// used in login and logout
export const injectTokenToHeaders = (
	token: string | null,
) => {
	apiClient.defaults.headers.common.Authorization = token
		? `Bearer ${token}`
		: ''
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// export const apiClient = axios.create({
// 	// biome-ignore lint/style/useNamingConvention: <explanation>
// 	baseURL: 'http://localhost:3001/api',
// })

// apiClient.defaults.headers.common['Content-Type'] =
// 	'application/json'
// apiClient.defaults.headers.common['Content-Type'] =
// 	'multipart/form-data'

// // used in login and logout

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

// :::::::::::::::::: VANHA ERROR RESPONSE käsittely ::::::::::::::::::::::::::::::::
// apiClient.interceptors.response.use(
// 	(response: AxiosResponse) => response,
// 	async (error) => {
// 		if (error.response.status === 401) {
// 			return Promise.reject('Unauthorized http-common-file')
// 		}
// 		return Promise.reject(error)
// 	},
// )

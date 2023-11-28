import axios from 'axios'

export const Api = axios.create({ 
  baseURL: 'https://api.weedu.com.br/api'
})

Api.defaults.headers.post['Content-Type'] = 'application/json'

Api.interceptors.request.use(
	(config: any) => {
		let token = localStorage.getItem('token')

		if (!token) {
			return config
		}

		if (config.headers['Authorization'] === undefined) {
			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	},
	error => Promise.reject(error)
)

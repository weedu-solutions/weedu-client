import { Api } from './api'
export class UserServices {
	static async createUserCustomer(formData: any) {
		const { data } = await Api.post(`auth/user`, formData)
		return data
	}

	static async updateUserCustomer(id: any, formData: any) {
		const { data } = await Api.post(`auth/user/${id}`, formData)
		return data
	}

	static async blockUserCustomer(userId: string, formData: any) {
		const { data } = await Api.post(`auth/is-active-user/${userId}`, formData)
		return data
	}

	static async getUserCustomer(id: any) {
		const { data } = await Api.post(`auth/user/${id}`)
		return data
	}
}

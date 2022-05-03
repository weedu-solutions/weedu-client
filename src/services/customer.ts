import { Api } from './api'
export class CustomerServices {
  static async getAllCustomers() {
		var { data } = await Api.get('auth/customer/')
		return data
	}

	static async getAllUserCustomer(id: number) {
		var { data } = await Api.get(`auth/user-customer/${id}`)
		return data
	}

	static async getCustomer(params: number) {
		var { data } = await Api.get(`auth/customer/${params}`)
		return data
	}

	static async updateCustomer(params: number, body: any) {
		await Api.post(`auth/customer/${params}`, body)
	}
}

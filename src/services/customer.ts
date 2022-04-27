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

	static async getCustomer(id: number) {
		var { data } = await Api.get(`auth/customer/${id}`)
		return data
	}
}

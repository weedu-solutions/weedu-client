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

	static async getCustomer(CompanyId: number) {
		var { data } = await Api.get(`auth/customer/${CompanyId}`)
		return data
	}

	static async updateCustomer(CompanyId: number, body: any) {
		await Api.post(`auth/customer/${CompanyId}`, body)
	}

	static async createCustomer(formData: any) {
		const { data } = await Api.post(`auth/customer`, formData)
		return data
	}

	static async blockCustomer(CompanyId: number) {
		await Api.post(`auth/block_customer/${CompanyId}`)
	}
}

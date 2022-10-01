import { Api } from './api'
export class CustomerServices {
	static async getAllCustomers() {
		var { data } = await Api.get('auth/customer/')
		return data
	}

	static async getAllUserCustomer(id: number | string) {
		var { data } = await Api.get(`auth/user-customer/${id}`)
		return data
	}

	static async getCustomer(CompanyId: number) {
		var { data } = await Api.get(`auth/customer/${CompanyId}`)
		return data
	}

	static async updateCustomer(CompanyId: number, body: any) {
		var { data } = await Api.post(`auth/customer/${CompanyId}`, body)
		return data;
	}

	static async createCustomer(formData: any) {
		const { data } = await Api.post(`auth/customer`, formData)
		return data
	}

	static async blockConsutants(CompanyId: number) {
		const { data } = await Api.post(`auth/block_customer/${CompanyId}`)
		return data
	}

	static async blockCustomer(CompanyId: number, formData: any) {
		const { data } = await Api.post(`auth/block_customer/${CompanyId}`, formData)
		return data
	}
}

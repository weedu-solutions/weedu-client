import { Api } from './api'

// let user = localStorage.getItem('user');
// let { id } = JSON.parse(String(user));

export class CustomerServices {
  static async getAllCustomers(id: number) {
		var response = await Api.get(`auth/user-customer/${id}`)
		return response
	}
}

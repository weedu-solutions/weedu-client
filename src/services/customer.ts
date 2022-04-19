import { Api } from './api'

// let user = localStorage.getItem('user');
// let { id } = JSON.parse(String(user));

export class CustomerServices {
	static isTokenExpired(data: any) {
		if(data.status === "Token has Expired") {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
			alert("O token expirou, por favor faça o login novamente!")
			window.location.href = "/login"
      return;
    }
	}
	
  static async getAllCustomers() {
		var { data } = await Api.get('auth/customer/')
		this.isTokenExpired(data)
		return data
	}

	static async getAllUserCustomer(id: number) {
		var { data } = await Api.get(`auth/user-customer/${id}`)
		this.isTokenExpired(data)
		return data
	}
}

import { Api } from './api'
export class ConsultantsServices {
    static async getAllConsultants(id: string) {
        var { data } = await Api.get(`/auth/consultant-customer/${id}`)
        return data
    }

    static async getConsultant(id: string | null) {
        var { data } = await Api.get(`auth/consultant-with-customer/${id}`)
        return data
    }
}
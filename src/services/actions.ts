import { Api } from "./api"



export class ActionsServices {

    static async getAllActions(idCustumer: string | number) {
        var { data } = await Api.get(`/auth/paln-customer/${idCustumer}`)
        return data
    }
    static async getDataGraphic(companyID: string | number) {
        var { data } = await Api.get(`/auth/dashboard/${companyID}`)
        return data
    }


}

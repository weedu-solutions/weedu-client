import { Api } from "./api"



export class ActionsServices {

    static async getAllActions() {
        var { data } = await Api.get(`/auth/plan`)
        return data
    }

    static async getAllActionsCustomer(idCustumer: string | number) {
        var { data } = await Api.get(`/auth/plan-customer/${idCustumer}`)
        return data
    }

    static async getDataGraphic(companyID: string | number) {
        var { data } = await Api.get(`/auth/dashboard/${companyID}`)
        return data
    }

    static async getDataGraphicCustomer(companyID: string | number) {
        var { data } = await Api.get(`/auth/dashboard-customer/${companyID}`)
        return data
    }

}

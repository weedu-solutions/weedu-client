import { Api } from "./api"



export class ActionsServices {

    static async getAllActions() {
        var { data } = await Api.get('auth/plan')
        return data
    }

    static async getDataGraphic(companyID: string | number) {
        var { data } = await Api.get(`/auth/dashboard/${companyID}`)
        return data
    }


}

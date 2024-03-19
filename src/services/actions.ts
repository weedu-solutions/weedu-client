import { Api } from "./api";

export class ActionsServices {
  static async getAllActions() {
    var { data } = await Api.get(`/auth/plan`);
    return data;
  }

  static async getAllActionsCustomer(idCustumer: string | number) {
    var { data } = await Api.get(`/auth/plan-customer/${idCustumer}`);
    return data;
  }

  static async getDataGraphic(userID: string | number) {
    var { data } = await Api.get(`/auth/dashboard/${userID}`);
    return data;
  }

  static async getDataGraphicCustomer(companyID: string | number) {
    var { data } = await Api.get(`/auth/dashboard-customer/${companyID}`);
    return data;
  }
}

export const  getDataGraphic = async (userID: string | number) => {
  var { data } = await Api.get(`/auth/dashboard/${userID}`);
  return data;
}

export const getDataGraphicCustomer = async (companyID: string | number) => {
  var { data } = await Api.get(`/auth/dashboard-customer/${companyID}`);
  return data;
}

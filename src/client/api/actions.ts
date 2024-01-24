import { Api } from "../../services/api";

export const getPlanCustomer = async (idCustumer: string): Promise<any> => {
  const { data } = await Api.get(`/auth/plan-customer/${idCustumer}`);
  return data;
};

export const getAllActions = async (): Promise<any> => {
  const { data } = await Api.get(`/auth/plan`);
  return data;
};

import { AxiosError } from "axios";
import { getDataGraphic, getDataGraphicCustomer } from "../../services/actions";
import { useQuery } from "react-query";

export const useDataGraphicUsers = (userID: string) =>
  useQuery<any, AxiosError>(
    ["graphic-user"],
    async () => await getDataGraphic(userID),
    {
      enabled: true,
    }
  );

export const useDataGraphicCustomer = (companyID: string | number) =>
  useQuery<any, AxiosError>(
    ["graphic-customer"],
    async () => await getDataGraphicCustomer(companyID),
    {
      enabled: true,
    }
  );

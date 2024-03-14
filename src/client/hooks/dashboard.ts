import { AxiosError } from "axios";
import { getDataGraphic, getDataGraphicCustomer } from "../../services/actions";
import { useQuery } from "react-query";

export const useDataGraphic = (userID: string) =>
  useQuery<any, AxiosError>(
    ["actions-costumer"],
    async () => await getDataGraphic(userID),
    {
      enabled: true,
    }
  );

export const useDataGraphicCustomer = (
  companyID: string | number,
) =>
  useQuery<any, AxiosError>(
    ["all-actions"],
    async () => await getDataGraphicCustomer(companyID),
    {
      enabled: true,
    }
  );

import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getAllActions, getPlanCustomer } from "../api/actions";

export const usePlanCustomer = (idCustumer: string, enabled: boolean) =>
  useQuery<any, AxiosError>(
    ["actions-costumer"],
    async () => await getPlanCustomer(idCustumer),
    {
      enabled: enabled
    }
  );

export const useAllActions = (enabled: boolean) =>
  useQuery<any, AxiosError>(
    ["all-actions"],
    async () => await getAllActions(),
    {
      enabled: enabled
    }
  );

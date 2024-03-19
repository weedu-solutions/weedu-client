import { useQueryClient } from "react-query";
import { useAuth } from "../auth";

export const useInvalidateQueryActions = () => {
  const { user } = useAuth();

  const typeUserSimple = user?.user_type_id === 1 || user?.user_type_id === 2;
  const typeUserCustomer = user?.user_type_id === 3;

  const queryClient = useQueryClient();

  const invalidateQueryActions = () => {
    if (typeUserSimple) {
      queryClient.invalidateQueries({
        queryKey: ["graphic-user"],
      });
      return queryClient.invalidateQueries({
        queryKey: ["all-actions"],
      });
    }

    if (typeUserCustomer) {
      queryClient.invalidateQueries({
        queryKey: ["graphic-customer"],
      });
      return queryClient.invalidateQueries({
        queryKey: ["actions-costumer"],
      });
    }
    return;
  };

  return {
    invalidateQueryActions,
  };
};

import { useAllActions, usePlanCustomer } from "../../client/hooks/actions";
import { useAuth } from "../auth";
import { useCallback, useMemo, useState } from "react";

export const useListActions = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filterStatusIsActive, setFilterStatusIsActive] = useState(false);

  const { user, infoCompany } = useAuth();

  //   const typeUserSimple = user?.user_type_id === 1 || user?.user_type_id === 2;
  const typeUserCustomer = user?.user_type_id === 3;

  const { data: actionsCustomer, isLoading: loadingActionsCustomer } =
    usePlanCustomer(infoCompany?.id);

  const { data: actionsUserSimple, isLoading: loadingActions } =
    useAllActions();

  function compare(a: any, b: any) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  }

  const returnDataActions = useCallback(() => {
    let filteredActions;

    if (typeUserCustomer) {
      filteredActions = actionsCustomer?.data.sort(compare);
    } else {
      filteredActions = actionsUserSimple?.data.sort(compare);
    }

    if (selectedOptions.length !== 0) {
      setFilterStatusIsActive(true);
      filteredActions = filteredActions.filter((item: any) =>
        selectedOptions.includes(item.status.toString())
      );
    }

    return filteredActions;
  }, [typeUserCustomer, actionsCustomer, actionsUserSimple, selectedOptions]);

  const tableData = useMemo(() => {
    return returnDataActions() || [];
  }, [returnDataActions]);

  return {
    tableData,
    selectedOptions,
    setSelectedOptions,
    loadingActionsCustomer,
    loadingActions,
    filterStatusIsActive,
  };
};

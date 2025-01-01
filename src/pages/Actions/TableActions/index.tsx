import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { ROUTES } from "../../../constants/routes";
import { useAllActions, usePlanCustomer } from "../../../client/hooks/actions";
import { useAuth } from "../../../hooks/auth";
import { BoardActions } from "./BoardActions";
import { ActionModals } from "./components/ActionModals";
import TableLoader from "../../../components/Loaders/TableLoader";
import * as S from "./styles";
import IActions from "../../../interfaces/actions";
import { BoardLoader } from "../../../components/Loaders/BoardLoader";

export function TableActions() {
  const [modals, setModals] = useState({
    startAction: false,
    seeDetails: false,
    disableAction: false,
    options: false,
  });

  const [actionInfo, setActionInfo] = useState<IActions | undefined>();

  const { user, infoCompany } = useAuth();

  const isSimpleUser = useMemo(() =>
    user?.user_type_id === 1 || user?.user_type_id === 2,
    [user?.user_type_id]
  );

  const isCustomerUser = useMemo(() =>
    user?.user_type_id === 3,
    [user?.user_type_id]
  );

  const {
    data: actionsCustomer,
    isLoading: loadingActionsCustomer,
    refetch: refetchCustomer
  } = usePlanCustomer(infoCompany?.id, isCustomerUser);

  const {
    data: actionsUserSimple,
    isLoading: loadingActions,
    refetch: refetchAll
  } = useAllActions(isSimpleUser);

  const navigate = useNavigate();

  const refetchAllActions = () => {
    refetchAll();
    refetchCustomer();
  };

  const tableData = useMemo(() => {
    const actions = isCustomerUser
      ? actionsCustomer?.data
      : actionsUserSimple?.data;

    return actions || [];
  }, [
    isCustomerUser,
    actionsCustomer?.data,
    actionsUserSimple?.data
  ]);

  const handleModalVisibility = (modalName: keyof typeof modals) => {
    setModals(prev => ({
      ...prev,
      [modalName]: !prev[modalName]
    }));
  };

  if (loadingActions || loadingActionsCustomer) {
    return <BoardLoader />;
  }

  return (
    <>
      <ActionModals
        modals={modals}
        handleModalVisibility={handleModalVisibility}
        actionInfo={actionInfo}
        refetchAllActions={refetchAllActions}
      />

      <S.RowFilter>
        <div>Board de Ações</div>
        <S.ButtonNewAction onClick={() => navigate(ROUTES.CREATE_ACTION)}>
          <HiPlus fill="#fff" size="20" />
          Plano de Ação
        </S.ButtonNewAction>
      </S.RowFilter>

      <BoardActions
        actions={tableData}
        setActionInfo={setActionInfo}
        setIsModalSeeDetails={(value) => handleModalVisibility('seeDetails')}
        setIsModalStartAction={(value) => handleModalVisibility('startAction')}
      />
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { ROUTES } from "../../../constants/routes";
import { useListActions } from "../../../hooks/useActions/useListActions";
import { BoardActions } from "./BoardActions";
import { ActionModals } from "./components/ActionModals";
import TableLoader from "../../../components/Loaders/TableLoader";
import * as S from "./styles";
import IActions from "../../../interfaces/actions";

export function TableActions() {
  const {
    loadingActions,
    loadingActionsCustomer,
    tableData,
    refetchAllActions
  } = useListActions();

  const [modals, setModals] = useState({
    startAction: false,
    seeDetails: false,
    disableAction: false,
    options: false,
  });

  const [actionInfo, setActionInfo] = useState<IActions | undefined>();
  const navigate = useNavigate();

  const handleModalVisibility = (modalName: keyof typeof modals) => {
    setModals(prev => ({
      ...prev,
      [modalName]: !prev[modalName]
    }));
  };

  if (loadingActions || loadingActionsCustomer) {
    return <TableLoader />;
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
        setIsModalDisableAction={(value) => handleModalVisibility('disableAction')}
        refetchAllActions={refetchAllActions}
      />
    </>
  );
}

import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { ActionModals } from "./components/ActionModals";
import * as S from "./styles";
import { IAction } from "../../../interfaces/actions";
import { BoardLoader } from "../../../components/Loaders/BoardLoader";
import { BoardActions } from "./BoardActions";
import { ActionsSummary } from "./components/ActionsSummary";
import { useActions } from "../../../hooks/useActions";

export function TableActions() {
  const [modals, setModals] = useState({
    startOrFinishAction: false,
    seeDetails: false,
    disableAction: false,
    addAction: false,
    executeAction: false
  });

  const [actionInfo, setActionInfo] = useState<IAction>({} as IAction);
  const { actions, isLoading } = useActions();


  const handleModalVisibility = (modalName: keyof typeof modals) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  if (isLoading) {
    return <BoardLoader />;
  }

  return (
    <>
      <ActionModals
        modals={modals}
        handleModalVisibility={handleModalVisibility}
        actionInfo={actionInfo}
      />

      <S.RowFilter>
        <div>Board de Ações</div>
        <S.ButtonNewAction onClick={() => handleModalVisibility("addAction")}>
          <HiPlus fill="#fff" size="20" />
          Plano de Ação
        </S.ButtonNewAction>
      </S.RowFilter>

      <ActionsSummary
        actions={Array.isArray(actions) ? actions : []}
      />

      <BoardActions
        actions={Array.isArray(actions) ? actions : []}
        setActionInfo={setActionInfo}
        setIsModalSeeDetails={(value) => handleModalVisibility("seeDetails")}
        setIsModalStartOrFinishAction={(value) => handleModalVisibility("startOrFinishAction")}
        setIsModalExecuteAction={(value) => handleModalVisibility("executeAction")}
        setIsModalDisableAction={(value) => handleModalVisibility("disableAction")}
      />
    </>
  );
}

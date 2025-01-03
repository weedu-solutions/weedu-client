import { useEffect, useState } from "react";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { IAction } from "../../../../interfaces/actions";

import { Modal } from "../../../../components/Modal";
import * as S from "./styles";
import { useActions } from "../../../../hooks/useActions";

type ModalDisableActionProps = {
  closeModal: any;
  action: IAction;
};

export function ModalDisableAction({
  closeModal,
  action,
}: ModalDisableActionProps) {
  const { updateAction } = useActions();
  const [isActive, setIsActive] = useState<Number>();

  useEffect(() => {
    if (action?.is_active === 1) {
      setIsActive(0);
    } else {
      setIsActive(1);
    }
  }, [action?.is_active]);

  const handleSubmit = async () => {
    try {
      await updateAction.mutateAsync({
        ...action,
        is_active: isActive,
      });

      closeModal();
      Notify(
        NotifyTypes.SUCCESS,
        action?.is_active === 1
          ? "Seu Plano de Ação foi desativado com sucesso!"
          : "Seu Plano de Ação foi ativado com sucesso!"
      );
    } catch {
      Notify(
        NotifyTypes.ERROR,
        action?.is_active === 1
          ? "Não foi possível desativar seu Plano de Ação!"
          : "Não foi possível ativar seu Plano de Ação!"
      );
    }
  };

  return (
    <Modal
      title={
        action?.is_active === 1
          ? "Desativar Ação"
          : "Ativar Ação"
      }
      onClose={closeModal}
      maxWidth="450px"
    >
      <S.Container>
        <S.Legend>
          <S.LegendIcon>ℹ️</S.LegendIcon>
          <S.LegendText>
            A ação não será excluída, podendo ser
            {action?.is_active === 1 ? " reativada " : " desativada "}
            novamente
          </S.LegendText>
        </S.Legend>

        <S.ButtonGroup>
          <S.CancelButton onClick={closeModal}>
            Cancelar
          </S.CancelButton>
          <S.ConfirmButton onClick={handleSubmit}>
            Confirmar
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}

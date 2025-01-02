import { IAction } from "../../../../interfaces/actions";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { Api } from "../../../../services/api";
import { Modal } from "../../../../components/Modal";
import * as S from "./styles";

type ModalDisableActionProps = {
  closeModal: any;
  action: IAction;
  //  refetchAllActions: () => void;
};
export function ModalStartOrFinishAction({
  closeModal,
  action,
  //  refetchAllActions,
}: ModalDisableActionProps) {
  const [date, setDate] = useState(new Date());
  const isFinishing = !!action?.init_date;

  const handleSubmit = async () => {
    try {
      await Api.post(`/auth/plan/${action?.id}`, {
        ...action,
        init_date: !isFinishing
          ? moment(date).format("DD/MM/YYYY")
          : action.init_date,
        end_date: isFinishing
          ? moment(date).format("DD/MM/YYYY")
          : action.end_date,
      });

      closeModal();
      Notify(
        NotifyTypes.SUCCESS,
        isFinishing
          ? "Ação finalizada com sucesso!"
          : "Ação iniciada com sucesso!"
      );
      //  refetchAllActions();
    } catch {
      Notify(
        NotifyTypes.ERROR,
        isFinishing ? "Erro ao finalizar ação" : "Erro ao iniciar ação"
      );
    }
  };

  const isInvalidDate =
    isFinishing && moment(action.init_date, "DD/MM/YYYY").isAfter(moment(date));

  return (
    <Modal
      title={
        <S.TitleWrapper>
          <span>{isFinishing ? "Finalizar Ação" : "Iniciar Ação"}</span>
          <S.InfoIcon>ℹ️</S.InfoIcon>
          <S.Tooltip className="tooltip">
            {isFinishing
              ? "Defina a data em que a ação foi efetivamente concluída"
              : "Defina a data em que a ação foi efetivamente iniciada"}
          </S.Tooltip>
        </S.TitleWrapper>
      }
      onClose={closeModal}
      maxWidth="450px"
    >
      <S.Container>
        {isFinishing && (
          <S.DateInfo>
            <span>📅</span> Data de início: {action.init_date}
          </S.DateInfo>
        )}

        <S.CalendarWrapper>
          <Calendar
            onChange={setDate}
            value={date}
            className="calendar-custom"
          />
        </S.CalendarWrapper>

        {isInvalidDate && (
          <S.ErrorMessage>
            <span>⚠️</span>A data de fim não pode ser menor que a data de início
          </S.ErrorMessage>
        )}

        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={closeModal}>
            Cancelar
          </S.CancelButton>
          <S.SaveButton
            type="button"
            onClick={handleSubmit}
            disabled={isInvalidDate}
          >
            {isFinishing ? "Finalizar" : "Iniciar"}
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}

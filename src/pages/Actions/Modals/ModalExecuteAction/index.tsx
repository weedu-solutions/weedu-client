import { Modal } from "../../../../components/Modal";
import { useTheme } from "@chakra-ui/react";
import * as S from "./styles";
import { useAuth } from "../../../../hooks/auth";
import Calendar from "react-calendar";
import { SetStateAction, useState } from "react";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { IAction } from "../../../../interfaces/actions";
import { useActions } from "../../../../hooks/useActions";

type ModalExecuteActionProps = {
  closeModal: any;
  action: IAction;
};

export function ModalExecuteAction({
  closeModal,
  action,
}: ModalExecuteActionProps) {
  const { updateAction } = useActions();
  const { user, infoCompany } = useAuth();
  const [startDate, setStartDate] = useState<Date>(
    action?.init_date ? moment(action.init_date, "DD/MM/YYYY").toDate() : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    action?.end_date ? moment(action.end_date, "DD/MM/YYYY").toDate() : new Date()
  );
  const [activeDate, setActiveDate] = useState<'start' | 'end'>('start');

  const idCustomer = user?.user_type_id === 3 ? infoCompany.id : user?.customer[0].id;

  const onSubmit = async () => {
    try {
      await updateAction.mutateAsync({
        ...action,
        init_date: moment(startDate).format("DD/MM/YYYY"),
        end_date: moment(endDate).format("DD/MM/YYYY"),
        user_id: user.id,
        customer_id: idCustomer,
        where: "O",
      });

      closeModal();
      Notify(NotifyTypes.SUCCESS, "Datas atualizadas com sucesso!");
    } catch (error) {
      closeModal();
      Notify(NotifyTypes.ERROR, "Não foi possível atualizar as datas!");
    }
  };

  const isInvalidDates = moment(startDate).isAfter(moment(endDate));

  return (
    <Modal 
      title={
        <S.TitleWrapper>
          <span>Datas Reais</span>
          <S.InfoIcon>ℹ️</S.InfoIcon>
          <S.Tooltip className="tooltip">
            As datas reais representam quando a ação efetivamente começou e terminou
          </S.Tooltip>
        </S.TitleWrapper>
      } 
      onClose={closeModal} 
      maxWidth="450px"
    >
      <S.Container>
        <S.DateDisplay>
          <S.DateCard 
            isActive={activeDate === 'start'}
            onClick={() => setActiveDate('start')}
          >
            <S.DateLabel>
              <span>📅</span> Data Início Real
            </S.DateLabel>
            <S.DateValue>
              {moment(startDate).format("DD/MM/YYYY")}
            </S.DateValue>
          </S.DateCard>
          
          <S.DateCard 
            isActive={activeDate === 'end'}
            onClick={() => setActiveDate('end')}
          >
            <S.DateLabel>
              <span>🎯</span> Data Fim Real
            </S.DateLabel>
            <S.DateValue>
              {moment(endDate).format("DD/MM/YYYY")}
            </S.DateValue>
          </S.DateCard>
        </S.DateDisplay>

        <S.CalendarWrapper>
          <Calendar 
            onChange={(date: SetStateAction<Date>) => {
              if (activeDate === 'start') {
                setStartDate(date);
              } else {
                setEndDate(date);
              }
            }} 
            value={activeDate === 'start' ? startDate : endDate} 
            className="calendar-custom"
          />
        </S.CalendarWrapper>

        {isInvalidDates && (
          <S.ErrorMessage>
            <span>⚠️</span>
            A data de fim não pode ser menor que a data de início.
          </S.ErrorMessage>
        )}

        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={closeModal}>
            Cancelar
          </S.CancelButton>
          <S.SaveButton
            type="button"
            onClick={onSubmit}
            disabled={isInvalidDates}
          >
            Salvar Datas
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}

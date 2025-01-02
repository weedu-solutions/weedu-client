import { DraggableProvided } from "react-beautiful-dnd";
import { BoxColor } from "../../../../../components/BoxColor";
import { IAction } from "../../../../../interfaces/actions";
import * as S from "./styles";

interface CardProps {
  action: IAction;
  onClick: () => void;
  provided: DraggableProvided;
}

export function Card({ action, onClick, provided }: CardProps) {
  return (
    <S.Card
      onClick={onClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <S.CardHeader>
        <S.CardTitle>{action.what}</S.CardTitle>
        <BoxColor status={action.status} rowInfo={action} />
      </S.CardHeader>

      <S.CardContent>
        <S.CardInfo>
          <S.CardInfoItem>
            <S.IconWrapper>👤</S.IconWrapper>
            {action.who}
          </S.CardInfoItem>
        </S.CardInfo>

        <S.DateSection>
          {action.init_date && (
            <S.DateRow>
              <S.DateLabel>Data de início:</S.DateLabel>
              <S.DateValue>{action.init_date}</S.DateValue>
            </S.DateRow>
          )}
          {action.end_date && (
            <S.DateRow>
              <S.DateLabel>Data de fim:</S.DateLabel>
              <S.DateValue>{action.end_date}</S.DateValue>
            </S.DateRow>
          )}
          <S.DateRow>
            <S.DateLabel>Início previsto:</S.DateLabel>
            <S.DateValue>{action.preview_init_date}</S.DateValue>
          </S.DateRow>
          <S.DateRow>
            <S.DateLabel>Fim previsto:</S.DateLabel>
            <S.DateValue>{action.preview_end_date}</S.DateValue>
          </S.DateRow>
        </S.DateSection>
      </S.CardContent>
    </S.Card>
  );
}

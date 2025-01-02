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
      <BoxColor status={action.status} rowInfo={action} />
      </S.CardHeader>
      <S.CardContent>
        <S.CardTitle>{action.what}</S.CardTitle>
        <S.CardInfo>
          <S.CardInfoItem>
            <S.IconWrapper>👤</S.IconWrapper>
            {action.who}
          </S.CardInfoItem>
          <S.CardInfoItem>
            <S.IconWrapper>📅</S.IconWrapper>
            Data de início: {action.preview_init_date}
          </S.CardInfoItem>
        </S.CardInfo>
      </S.CardContent>
    </S.Card>
  );
}

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
        <S.LabelWithEmoji>
          <S.Emoji>👤</S.Emoji>
          <S.Title>{action.who}</S.Title>
        </S.LabelWithEmoji>
        <BoxColor status={action.status} rowInfo={action} />
      </S.CardHeader>

      <S.CardContent>
        <S.InfoRow>
          <S.LabelWithEmoji>
            <S.Emoji>🎯</S.Emoji>
            <S.Label>Plano de ação</S.Label>
          </S.LabelWithEmoji>
          <S.Value>{action.what}</S.Value>
        </S.InfoRow>

        {action.problem && (
          <S.InfoRow>
            <S.LabelWithEmoji>
              <S.Emoji>⚠️</S.Emoji>
              <S.Label>Problema</S.Label>
            </S.LabelWithEmoji>
            <S.Value>{action.problem}</S.Value>
          </S.InfoRow>
        )}

        <S.DateRow>
          <S.DateGroup>
            <S.DateCard>
              <S.DateHeader>
                <S.Emoji>⏳</S.Emoji>
                <S.DateLabel>Início previsto</S.DateLabel>
              </S.DateHeader>
              <S.DateValue>{(action.preview_init_date)}</S.DateValue>
            </S.DateCard>
            
            {action.init_date && (
              <S.DateCard isReal>
                <S.DateHeader>
                  <S.Emoji>✅</S.Emoji>
                  <S.DateLabel>Data de início</S.DateLabel>
                </S.DateHeader>
                <S.DateValue isReal>{(action.init_date)}</S.DateValue>
              </S.DateCard>
            )}
          </S.DateGroup>
        </S.DateRow>

        <S.DateRow>
          <S.DateGroup>
            <S.DateCard>
              <S.DateHeader>
                <S.Emoji>⏳</S.Emoji>
                <S.DateLabel>Fim previsto</S.DateLabel>
              </S.DateHeader>
              <S.DateValue>{(action.preview_end_date)}</S.DateValue>
            </S.DateCard>
            
            {action.end_date && (
              <S.DateCard isReal>
                <S.DateHeader>
                  <S.Emoji>✅</S.Emoji>
                  <S.DateLabel>Data de fim</S.DateLabel>
                </S.DateHeader>
                <S.DateValue isReal>{(action.end_date)}</S.DateValue>
              </S.DateCard>
            )}
          </S.DateGroup>
        </S.DateRow>
      </S.CardContent>
    </S.Card>
  );
}

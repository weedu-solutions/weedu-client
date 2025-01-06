import { Tooltip } from "@chakra-ui/react"
import { DraggableProvided } from "react-beautiful-dnd";
import { FaRegCalendarCheck, FaRegCalendarPlus } from "react-icons/fa";

import { IAction } from "../../../../../interfaces/actions";
import * as S from "./styles";

interface CardProps {
  action: IAction;
  onClick: () => void;
  provided: DraggableProvided;
}

interface BoxColorProps {
  status: number;
  rowInfo?: any;
}

const STATUS_COLORS: Record<number, string> = {
  1: "#8B5CF6", // A iniciar (roxo)
  2: "#3B82F6", // Em execução (azul)
  3: "#2DD4BF", // Executada (verde água)
  4: "#FB7185", // Atrasada a iniciar (rosa)
  5: "#EF4444", // Atrasada a terminar (vermelho)
  6: "#6B7280", // Bloqueada (cinza escuro)
  7: "#F59E0B"  // Executada com atraso (laranja)
};

const STATUS_LABELS: Record<number, string> = {
  1: "A iniciar",
  2: "Em execução",
  3: "Executada",
  4: "Atrasada a iniciar",
  5: "Atrasada a terminar",
  7: "Executada com atraso"
};



export function SmallBoxColor({ status, rowInfo }: BoxColorProps) {
  const isBlocked = !rowInfo?.is_active;
  const color = isBlocked ? "#6B7280" : STATUS_COLORS[status];

  return (
    <Tooltip hasArrow placement='top' label={STATUS_LABELS[status]}>
      <S.Box color={color} />
    </Tooltip>
  );
}

const getDateLabelsAndValues = (action: IAction, status: number) => {
  const dateConfigs: Record<number, {
    startLabel: string;
    endLabel: string;
    startDate: string;
    endDate: string;
  }> = {
    1: {
      startLabel: "Data de início prevista",
      endLabel: "Data fim prevista",
      startDate: action.preview_init_date,
      endDate: action.preview_end_date
    },
    2: {
      startLabel: "Data de início real",
      endLabel: "Data fim prevista",
      startDate: action.init_date,
      endDate: action.preview_end_date
    },
    3: {
      startLabel: "Data de início real",
      endLabel: "Data fim real",
      startDate: action.init_date,
      endDate: action.end_date
    },
    4: {
      startLabel: "Data de início prevista",
      endLabel: "Data fim prevista",
      startDate: action.preview_init_date,
      endDate: action.preview_end_date
    },
    5: {
      startLabel: "Data de início real",
      endLabel: "Data fim prevista",
      startDate: action.init_date,
      endDate: action.preview_end_date
    },
    7: {
      startLabel: "Data de início real",
      endLabel: "Data fim real",
      startDate: action.init_date,
      endDate: action.end_date
    }
  };

  return dateConfigs[status] || {
    startLabel: "Data de início",
    endLabel: "Data fim",
    startDate: action.preview_init_date,
    endDate: action.preview_end_date
  };
};

export function Card({ action, onClick, provided }: CardProps) {
  const renderDates = () => {
    if (action.status === 6) return null;
    
    const { startLabel, endLabel, startDate, endDate } = getDateLabelsAndValues(action, action.status);

    return (
      <S.SmallDetailsContainer>
        <Tooltip hasArrow placement='left' label={startLabel}>
          <S.DateContainer>
            <FaRegCalendarPlus size={14} color="#464646" />
            <S.DateValueText>{startDate}</S.DateValueText>
          </S.DateContainer>
        </Tooltip>

        <Tooltip hasArrow placement='left' label={endLabel}>
          <S.DateContainer>
            <FaRegCalendarCheck size={14} color="#464646" />
            <S.DateValueText>{endDate}</S.DateValueText>
          </S.DateContainer>
        </Tooltip>
      </S.SmallDetailsContainer>
    );
  };

  return (
    <S.Card
      onClick={onClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <S.CardHeader>
        <S.ToHeaderContainer>     
          <SmallBoxColor status={action.status} rowInfo={action} />
          <S.LabelWithEmoji>
            <S.Emoji>👤</S.Emoji>
            <S.UserName>{action.who}</S.UserName>
          </S.LabelWithEmoji>
        </S.ToHeaderContainer>

        <S.IdentifierContainer>
          <Tooltip hasArrow placement='left' label="Plano de ação">
            <S.ActionPlan>{action.what}</S.ActionPlan>
          </Tooltip>

          <Tooltip hasArrow placement='left' label="Problema">
            <S.Problem>{action.problem}</S.Problem>
          </Tooltip>
        </S.IdentifierContainer>

        {renderDates()}
      </S.CardHeader>
    </S.Card>
  );
}

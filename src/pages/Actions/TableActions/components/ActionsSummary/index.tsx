import React from "react";
import { IAction } from "../../../../../interfaces/actions";
import * as S from "./styles";

interface IActionsSummary {
  actions: IAction[];
}

const STATUS_COLORS: Record<number, string> = {
  1: "#8B5CF6", // A iniciar
  2: "#3B82F6", // Em execução
  3: "#2DD4BF", // Executada
  4: "#FB7185", // Atrasada a iniciar
  5: "#EF4444", // Atrasada a terminar
  6: "#6B7280", // Bloqueada
  7: "#F59E0B"  // Executada com atraso
};

const STATUS_LABELS: Record<number, string> = {
  1: "A iniciar",
  2: "Em execução",
  3: "Executada",
  4: "Atrasada a iniciar",
  5: "Atrasada a terminar",
  6: "Bloqueada",
  7: "Executada com atraso"
};

const STATUS_DESCRIPTIONS: Record<number, string> = {
  1: "Ações que ainda não foram iniciadas",
  2: "Ações em andamento dentro do prazo",
  3: "Ações finalizadas com sucesso no prazo",
  4: "Ações que não foram iniciadas e estão atrasadas",
  5: "Ações em andamento com prazo expirado",
  6: "Ações temporariamente bloqueadas",
  7: "Ações finalizadas após o prazo previsto"
};

export function ActionsSummary({ actions }: IActionsSummary) {

    const summary = actions.reduce((acc, action) => {
    acc[action.status] = (acc[action.status] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const allStatuses = [1, 2, 3, 4, 5, 7];

  return (
    <S.DashboardContainer>

      <S.SummaryContainer>
        {allStatuses.map(statusNum => {
          const count = summary[statusNum] || 0;
          return (
            <S.SummaryCard
              key={statusNum}
              color={STATUS_COLORS[statusNum]}
            >
              <S.StatusNumber color={STATUS_COLORS[statusNum]}>
                {count}
              </S.StatusNumber>
              <S.StatusContent>
                <S.StatusLabel>{STATUS_LABELS[statusNum]}</S.StatusLabel>
                <S.StatusDescription>
                  {STATUS_DESCRIPTIONS[statusNum]}
                </S.StatusDescription>
              </S.StatusContent>
            </S.SummaryCard>
          );
        })}
      </S.SummaryContainer>
    </S.DashboardContainer>
  );
}

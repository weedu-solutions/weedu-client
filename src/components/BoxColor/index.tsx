import styled from 'styled-components';
import { IAction } from '../../interfaces/actions';
import * as S from './styles';

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
  6: "Bloqueada",
  7: "Executada com atraso"
};

export function BoxColor({ status, rowInfo }: BoxColorProps) {
  const isBlocked = !rowInfo?.is_active;
  const color = isBlocked ? "#6B7280" : STATUS_COLORS[status];
  const label = STATUS_LABELS[status];

  return (
      <S.Box color={color}>
        <S.Label>{label}</S.Label>
      </S.Box>
  );
}

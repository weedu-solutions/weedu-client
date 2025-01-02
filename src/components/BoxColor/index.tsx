import styled from 'styled-components';
import { IAction } from '../../interfaces/actions';

interface BoxColorProps {
  status: number;
  rowInfo: IAction;
  isBlocked?: boolean;
}

const Badge = styled.span<{ status: number; isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;

  ${({ status, isActive }) => {
    // Primeiro verificamos se está inativo
    if (!isActive) {
      return `
        background-color: #9CA3AF;
        color: white;
      `;
    }

    // Se estiver ativo, verificamos o status
    switch (status) {
      case 1: // A iniciar
        return `
          background-color: #8B5CF6;
          color: white;
        `;
      case 2: // Em execução
        return `
          background-color: #3B82F6;
          color: white;
        `;
      case 3: // Executadas
        return `
          background-color: #2DD4BF;
          color: white;
        `;
      case 4: // Atrasadas a iniciar
        return `
          background-color: #FB7185;
          color: white;
        `;
      case 5: // Atrasadas a terminar
        return `
          background-color: #EF4444;
          color: white;
        `;
      default:
        return `
          background-color: #E5E7EB;
          color: #374151;
        `;
    }
  }}
`;

export function BoxColor({ status, rowInfo }: BoxColorProps) {
  const getStatusText = (status: number, isActive: boolean) => {
    // Primeiro verificamos se está inativo

    // Se estiver ativo, retornamos o status apropriado
    switch (status) {
      case 1:
        return 'A iniciar';
      case 2:
        return 'Em execução';
      case 3:
        return 'Executada';
      case 4:
        return 'Atrasada a iniciar';
      case 5:
        return 'Atrasada a terminar';
      default:
        return 'Status desconhecido';
    }
  };

  return (
    <Badge
      status={status}
      isActive={rowInfo.is_active === 1}
    >
      {getStatusText(status, rowInfo.is_active === 1)}
    </Badge>
  );
}

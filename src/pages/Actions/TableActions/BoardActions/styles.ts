import styled, { css } from 'styled-components';

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 4 colunas com largura igual
  gap: 24px;
  padding: 24px;
  width: 100%;
  min-height: calc(100vh - 280px);
  background: #f8fafc;
`;

export const Column = styled.div<{ isDisabled?: boolean }>`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  margin: 0 8px;
  opacity: ${({ isDisabled }) => (isDisabled ? "0.5" : "1")};
`;

export const ColumnTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #464646;
  margin: 0;
`;

export const CardsContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  min-height: 200px;
  max-height: calc(100vh - 300px);

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const DragIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
`;

export const ColumnIndicator = styled.div<{ isDraggingOver: boolean }>`
  position: relative;
  flex: 1;

  ${props => props.isDraggingOver && css`
    background: rgba(121, 86, 247, 0.05);
    border-radius: 8px;
  `}
`;

export const EmptyColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  min-height: 200px;
`;

export const EmptyColumnIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  opacity: 0.5;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

export const ColumnButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  color: #464646;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.1);
  }

  svg {
    color: #464646;
  }
`;

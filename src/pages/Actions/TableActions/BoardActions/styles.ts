import styled, { css } from 'styled-components';

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 colunas com largura igual
  gap: 24px;
  padding: 24px;
  width: 100%;
  min-height: calc(100vh - 280px);
  background: #f8fafc;
`;

export const Column = styled.div<{ isDisabled?: boolean }>`
  background: ${props => props.isDisabled ? '#ffebee' : '#ffffff'};
  border: ${props => props.isDisabled ? '2px solid #ffcdd2' : '1px solid #e2e8f0'};
  height: fit-content;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  ${props => props.isDisabled && `
    cursor: not-allowed;
    box-shadow: 0 0 15px rgba(244, 67, 54, 0.1);
  `}

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const ColumnTitle = styled.h3`
  margin: 0;
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.5px;
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

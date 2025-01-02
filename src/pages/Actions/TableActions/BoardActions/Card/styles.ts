import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
`;

export const IconWrapper = styled.span`
  font-size: 14px;
`;
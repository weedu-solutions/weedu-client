import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 13px;
`;

export const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
`;

export const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateLabel = styled.span`
  color: #94a3b8;
  font-size: 12px;
`;

export const DateValue = styled.span`
  color: #475569;
  font-size: 12px;
  font-weight: 500;
`;

export const IconWrapper = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
`;
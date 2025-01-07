import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  gap: 4px;
  background: #f8fafc;
  border-radius: 12px;
  border-bottom: 1px solid #e2e8f0;
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

export const Label = styled.span`
  color: #6b7280;
  font-size: 13px;
`;

export const Value = styled.span`
  color: #111827;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;

export const IdentifierContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionPlan = styled.span`
  color: #111827;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 4px;
  }
`;

export const Problem = styled.span`
  color: #757575;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 4px;
  }
`;

export const Status = styled.span<{ status: 'late' | 'onTime' | 'completed' }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  
  ${({ status }) => {
    switch (status) {
      case 'late':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'completed':
        return 'background: #DCFCE7; color: #16A34A;';
      default:
        return 'background: #E0F2FE; color: #0284C7;';
    }
  }}
`;

export const DateRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

export const DateGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const DateCard = styled.div<{ isReal?: boolean }>`
  flex: 1;
  background: ${({ isReal }) => isReal ? '#F0FDF4' : '#F8FAFC'};
  border: 1px solid ${({ isReal }) => isReal ? '#DCFCE7' : '#E2E8F0'};
  border-radius: 8px;
  padding: 8px 12px;
`;

export const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

export const DateLabel = styled.span`
  color: #64748B;
  font-size: 13px;
  font-weight: 500;
`;

export const DateValue = styled.span<{ isReal?: boolean }>`
  color: ${({ isReal }) => isReal ? '#16A34A' : '#475569'};
  font-size: 14px;
  font-weight: 500;
`;

export const ToHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const SmallDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
`;

export const Emoji = styled.span`
  font-size: 12px;
`;

export const UserName = styled.span`
  font-size: 12px;
`;

export const LabelWithEmoji = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    padding: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    padding: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const DateValueText = styled.span`
  color: #757575;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-word;
`;

interface BoxProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Box = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  border-radius: 999px;
  padding: 4px 12px;
  max-width: 40px;
  height: 8px;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background: #1e293b;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5px);
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 20px;
    width: 8px;
    height: 8px;
    background: #1e293b;
    transform: rotate(45deg);
  }
`;


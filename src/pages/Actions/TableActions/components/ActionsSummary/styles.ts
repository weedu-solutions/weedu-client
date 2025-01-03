import styled from "styled-components";

interface ColorProps {
  color: string;
  isSelected?: boolean;
}

export const DashboardContainer = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const DashboardTitle = styled.h2`
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
`;

export const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const StatusIcon = styled.div<ColorProps>`
  width: 48px;
  height: 48px;
  background: ${props => props.color};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 1.125rem;
`;

export const StatusInfo = styled.div`
  flex: 1;
`;

export const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
`;

export const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: #4a4a4a;
`;

export const StatusDescription = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
`;
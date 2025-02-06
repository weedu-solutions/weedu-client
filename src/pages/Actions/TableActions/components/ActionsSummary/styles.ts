import styled from "styled-components";

export const DashboardContainer = styled.div`
  background: #F8FAFC;
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

export const SummaryCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 8px;
`;

export const StatusNumber = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

export const StatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const StatusLabel = styled.span`
  font-weight: bold;
  color: #1F2937;
  font-size: 16px;
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

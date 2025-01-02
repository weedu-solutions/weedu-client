import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  overflow-x: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingText = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CompanyName = styled.h1`
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 600;
`;

export const UserName = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #7956F7;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #6744f5;
    transform: translateY(-1px);
  }

  svg {
    fill: currentColor;
  }
`;

export const ChartsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const BoardSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;
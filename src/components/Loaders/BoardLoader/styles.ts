import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
  background: #f9fafb;
  min-height: calc(100vh - 200px);
`;

export const Column = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  min-height: 500px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`; 
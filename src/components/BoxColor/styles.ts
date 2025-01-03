import styled from "styled-components";

interface BoxProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Box = styled.div<BoxProps>`
  background: ${props => props.color};
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

export const Label = styled.span`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
`;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Box = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  border-radius: 999px;
  padding: 4px 12px;
  width: fit-content;
`;

export const Label = styled.span`
  color: white;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

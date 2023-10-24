import styled from "styled-components";

type TagProps = {
  bgColor: string;
};

export const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  display: flex;
  border-radius: 4px;
  width: 16px;
  height: 16px;

  background-color: ${(prop: TagProps) => (prop.bgColor ? prop.bgColor : "")};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  background: red;
`;

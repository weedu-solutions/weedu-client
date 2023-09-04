import styled from "styled-components";

import { colors } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 0;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;

  h1 {
    font-weight: 600;
    font-family: "Inter";
    font-style: normal;
    font-size: 32px;
    color: #1e163e;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 30px;
`;

export const AddButtonWrapper = styled.div`
  position: absolute;
  right: 180px;
  bottom: 30px;
`;

export const TextBlock = styled.p`
  color: #e71d36;
  font-weight: 700;
`;

export const TextUnBlock = styled.p`
  color: #3d2b7c;
  font-weight: 700;
`;

export const ModalContent = styled.div`
  padding: 15px;
  display: flex;
  max-width: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

  h2 {
    margin-bottom: 10px;
    align-self: center;
  }
`;

export const ModalBlockContent = styled.div`
  padding: 15px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto;

  h2 {
    margin-bottom: 10px;
    font-size: 1.4rem;
  }
  p {
    margin-bottom: 20px;
  }
`;

export const WrapperInputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

export const Message = styled.div`
  h1 {
    font-size: 30px;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #3d2b7c;
  color: #3d2b7c;
  font-weight: 500;
  border-radius: 16px;
  cursor: pointer;
`;

export const CheckboxList = styled.div`
  position: absolute;
  top: 100%;
  width: 15rem;
  left: 0;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #3d2b7c;
  margin-top: 10px;
  border-radius: 16px;
  max-height: 400px;
  overflow: auto;
  padding: 4px;

  p {
    padding: 8px;
    margin-left: 4px;
    color: #1e163e;
    font-weight: 700;
  }
`;

export const CheckboxLabel = styled.label`
  display: block;
  padding: 8px;
  cursor: pointer;
  margin-left: 10px;

  span {
    margin-left: 4px;
    font-weight: 500;
  }
`;

export const CheckboxInput = styled.input``;

export const ButtonFilter = styled.button`
  max-height: 200px;
  border-radius: 10px;
  padding: 8px 16px;
  border: 1px solid #3d2b7c;
  margin-left: 10px;
`;

export const RowFilter = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

interface IButtonAction {
  isInit: boolean;
}

export const ButtonActions = styled.button<IButtonAction>`
  border: 1px solid ${(prop: any) => (prop.isInit ? "#D8564E" : "#4ED874")};
  color: ${(prop: any) => (prop.isInit ? "#D8564E" : "#4ED874")};
  width: 100px;
  height: 30px;
  border-radius: 10px;
  font-weight: 500;

  :hover {
    filter: brightness(0.9);
  }

  :disabled {
    border-color: #d6d7da;
    color: #d6d7da;
    :hover {
    }
  }
`;

export const ButtonNewAction = styled.button`
  color: white;
  max-height: 200px;
  font-weight: 500;
  background-color: ${colors.primary.medium};
  border-radius: 10px;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-right: 10px;
  }

  :hover {
    box-shadow: 0px 0px 10px rgba(50, 0, 90, 0.4);
  }
`;

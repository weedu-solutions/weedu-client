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
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
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
    /* padding: 4px; */
    /* margin-left: 4px; */
    color: #1e163e;
    font-weight: 700;
  }
`;

export const CheckboxLabel = styled.label`
  display: block;
  padding: 4px;
  cursor: pointer;
  margin-left: 10px;

  width: 13rem;
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

// import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
`;

export const Column = styled.div`
  background: #f4f5f7;
  border-radius: 8px;
  width: 300px;
  min-height: 500px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ColumnTitle = styled.h3`
  text-align: center;
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
`;

export const Card = styled.div<{ isDisabled?: boolean }>`
  background: ${({ isDisabled }) => isDisabled ? '#F3F4F6' : 'white'};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ isDisabled }) => isDisabled ? '#E5E7EB' : '#eaeaea'};
  transition: all 0.2s ease;
  position: relative;

  ${({ isDisabled }) => isDisabled && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 8px;
      pointer-events: none;
    }
  `}

  &:hover {
    transform: ${({ isDisabled }) => isDisabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ isDisabled }) => isDisabled ? '0 2px 4px rgba(0, 0, 0, 0.05)' : '0 4px 8px rgba(0, 0, 0, 0.1)'};
  }
`;

export const CardContent = styled.div`
  margin-top: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  line-height: 1.4;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #718096;
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 1rem;
`;

export const CardHeader = styled.div`
  margin-bottom: 12px;
`;

import styled, { css } from "styled-components";

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
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 12px;

  > div:first-child {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
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
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const BoardContainer = styled.div`
  display: flex;
  padding: 24px;
  gap: 24px;
  width: 100%;
  height: 100%;
  background: #f8fafc;
`;

interface ColumnProps {
  isDisabled?: boolean;
}

export const Column = styled.div<ColumnProps>`
  background: ${(props) => (props.isDisabled ? "#ffebee" : "#ffffff")};
  border: ${(props) =>
    props.isDisabled ? "2px solid #ffcdd2" : "1px solid #e2e8f0"};
  min-width: 320px;
  flex: 1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  ${(props) =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
      box-shadow: 0 0 15px rgba(244, 67, 54, 0.1);
    `}

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const ColumnTitle = styled.h3`
  margin: 0;
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.5px;
`;

export const CardsContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 200px);

  /* Estilização da scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border-color: #cbd5e1;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CardTitle = styled.h3`
  font-size: 0.938rem;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.4;
  margin-bottom: 12px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

export const StatusTag = styled.span<{
  status: string;
  size?: "small" | "medium";
}>`
  padding: ${({ size }) => (size === "medium" ? "6px 16px" : "4px 12px")};
  border-radius: 16px;
  font-size: ${({ size }) => (size === "medium" ? "14px" : "12px")};
  font-weight: 500;
  display: inline-block;
  margin-bottom: 8px;

  ${({ status }) => {
    switch (status) {
      case "A iniciar":
        return css`
          background: #e0e7ff;
          color: #4338ca;
        `;
      case "Em execução":
        return css`
          background: #fef3c7;
          color: #92400e;
        `;
      case "Executadas":
        return css`
          background: #dcfce7;
          color: #166534;
        `;
      case "Desativadas":
        return css`
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return css`
          background: #f1f5f9;
          color: #475569;
        `;
    }
  }}
`;

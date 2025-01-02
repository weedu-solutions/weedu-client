import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  padding: 24px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

export const CloseButton = styled.button`
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #eff0f1;
`;
export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;
export const SubTitle = styled.div`
  width: 80%;
  height: 10%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin-top: 10px;
    font-weight: 700;
    font-size: 15px;
    color: #747880;
  }
`;
export const Form = styled.div`
  width: 80%;
  margin-top: 20px;
`;
export const Footer = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Toggle = styled.div`
  width: 98%;
  height: 90%;
  align-items: center;
  flex-direction: row;
  display: flex;
  background-color: #ffff;
  justify-content: space-around;
  border-radius: 20px;

  span {
    color: #7956f7;
    font-size: 16px;
    font-weight: 700;
  }
`;
export const Margin = styled.div`
  width: 31%;
  height: 40px;
  align-items: center;
  flex-direction: row;
  display: flex;
  border: 1px solid #7956f7;
  justify-content: space-around;
  border-radius: 20px;
`;

export const ContainerButtons = styled.div`
  width: 67%;
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: space-around;
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #eff0f1;
`;
export const Title = styled.div`
  width: 100%;
  height: 10%;
  align-items: center;
  display: flex;
  justify-content: center;
  justify-content: space-between;

  h1 {
    font-weight: 700;
    font-size: 25px;
  }

  button {
  }
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

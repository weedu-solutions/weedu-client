import styled from "styled-components";

import { colors } from "../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  margin-top: 16px;

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

export const MyButton = styled.button`
  background-color: ${colors.primary.ligther};
  color: ${colors.primary.medium};
  padding: 5px 7px;
  font-weight: 700;
  border-radius: 4px;
  border: 2px solid ${colors.primary.medium};
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

  .closeButton {
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background-color: ${colors.neutral.dark};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border-radius: 50%;
  }

  .hr {
    height: 1px;
    background-color: ${colors.neutral.medium};
    width: 100%;
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

export const ContentGraph = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #e0ddf0;
  width: 49%;
  border-radius: 8px;

  div > h1 {
    margin-left: 60px;
    margin-top: 20px;

    color: #201f24;
    font-weight: 700;
    font-size: 25px;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #7a778a;
  margin-bottom: 30px;
`;

export const ContainerTable = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 50px;
  position: relative;
`;

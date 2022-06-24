import styled from 'styled-components'
import { colors } from '../../theme'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 0;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;

  p {
    margin-top: 20px;
    font-size: 30px;
  }

  h1 {
    font-weight: 900;
  }
`

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 30px;
`

export const AddButtonWrapper = styled.div`
  position: absolute;
  right: 180px;
  bottom: 30px;
`

export const MyButton = styled.button`
  background-color: ${colors.primary.ligther};
  color: ${colors.primary.medium};
  padding: 5px 7px;
  font-weight: 700;
  border-radius: 4px;
  border: 2px solid ${colors.primary.medium};

  &:hover {
    filter: brightness(0.9);
  }
`

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
`

export const ModalBlockContent = styled.div`
  padding: 15px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto;

  h2 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
`

export const WrapperInputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`
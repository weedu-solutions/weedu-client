import styled from 'styled-components'
import { colors } from '../../theme'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative; 
  padding-top: 60px;

  h1 {
    font-weight: 900;
    margin-bottom: 40px;
  }
`

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  bottom: 30px;
`

export const Button = styled.button`
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
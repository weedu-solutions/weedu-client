import styled from 'styled-components'
import { colors } from '../../../theme'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  strong {
    font-size: 32px;
    text-align: center;
  }

  span {
    color: ${colors.error.ligth};
    font-weight: 600;
    font-size: 12px;
    align-self: flex-start;
    margin-top: -10px;
    margin-bottom: 20px;
    display: block;
  }
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
`

export const ButtonBlock = styled.div`
  width: 50%;
`

export const ButtonsEdit = styled.div`
  width: 50%;
  display: flex;  
  justify-content: space-between;
`

export const AttentionMessage = styled.p`
  color: red;
`



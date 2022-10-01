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
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 30px;
  justify-content: space-around;
`

export const AttentionMessage = styled.p`
  color: red;
`



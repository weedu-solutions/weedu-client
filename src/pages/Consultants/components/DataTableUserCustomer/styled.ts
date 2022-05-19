import styled from 'styled-components'
import { colors } from '../../../../theme'

export const Wrapper = styled.div`
  .container {
    .headers {
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
  
      strong {
        font-weight: 700;
        color: ${colors.primary.darker};
        margin-left: 15px;
      }
      button {
        color: ${colors.primary.medium};
        background-color: #fff;
        border: none;
        font-weight: 600;
        text-decoration: underline;
        align-self: flex-end;
        margin-right: 15px;
      }
    }
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

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
export const Box = styled.div`
  padding: 15px 0;

  .dropdown {
    position: sticky;
    display: none;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: ${colors.neutral.ligth};
    border-radius: 4px;
    border: 2px solid ${colors.neutral.dark};

    button {
      font-size: 12px;
      margin-bottom: 10px;
      background-color: transparent;
      border: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &:hover {
    .dropdown {
      display: flex;
    }
  }
`

export const ButtonTooltip = styled.button`
  border: 2px solid ${colors.primary.medium};
  border-radius: 2px;
  display: flex;
  padding: 3px;
  background-color: ${colors.primary.ligther};
  color: ${colors.primary.medium};
`

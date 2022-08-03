import styled from 'styled-components'
import { colors } from '../../../../theme'



export const TitleTable = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    p {
        font-size: 20px;
        font-weight: 700;
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
        align-items: center;
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
import styled from 'styled-components'
import { colors } from '../../../../theme'

export const Wrapper = styled.div`
  width: 100vw;
  height: 79px;
  background-color: #fff;
  border-bottom: 1px solid #E0DDF0;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100%;
`

export const HeaderRight = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  ul {
    list-style: none;
    display: flex;

    a {
      text-decoration: none;
      padding: 10px;
      margin: 0 20px;
      color: ${colors.primary.medium};
      font-weight: 700;
      position: relative;
      
      &:hover {
        &::after {
          content: '';
          height: 3px;
          border-radius: 3px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: ${colors.primary.medium};
        }
      }
    }
  }
`

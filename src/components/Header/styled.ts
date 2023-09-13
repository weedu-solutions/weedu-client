import styled from 'styled-components'

import { colors } from '../../theme'

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

  img {
    width: 90px;
    height: 40px;
  }
`

export const ContainerHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const LogoutButton = styled.button`
  color: white;
  max-height: 200px;
  font-weight: 500;
  background-color: ${colors.primary.medium};
  border-radius: 10px;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;

  :hover {
    box-shadow: 0px 0px 10px rgba(50, 0, 90, 0.4);
  }

  svg {
    margin-left: 10px;
  }
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

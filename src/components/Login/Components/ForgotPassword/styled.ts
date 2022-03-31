import styled from 'styled-components';
import { colors } from '../../../../theme';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span {
    color: ${colors.error.ligth};
    font-weight: 600;
    font-size: 11px;
    align-self: flex-start;
    margin-top: -15px;
    margin-bottom: 20px;
  }

  strong {
    font-size: 32px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 13px;
    font-weight: 300;
  }
`
import styled from 'styled-components';
import { colors } from '../../theme';

export const Wrapper = styled.div`
  width: 600px;
  height: 503px;
  border-radius: 8px;
  background-color: #fff;
  padding: 40px;
  padding-bottom: 80px;
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  text-align: center;

  strong {
    font-size: 32px;
  }

  p {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 40px;
    font-size: 12px;
    color: ${colors.primary.dark};
    background-color: #eff0f1;
    display: flex;
    justify-content: center;
    font-weight: 700;
    align-items: center;
    border-radius: 0 0 8px 8px;
  }
`
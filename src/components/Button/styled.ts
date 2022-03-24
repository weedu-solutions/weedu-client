import styled from "styled-components";
import { colors } from '../../theme'

export const MyButton = styled.button`
  background-color: ${colors.primary.medium};
  border-radius: 4px;
  border: none;
  min-height: 56px;
  max-height: 520px;
  font-size: 16px;
  font-weight: 700;
  font-family: Inter;
  width: 100%;
  color: #fff;

  &:hover {
    filter: brightness(0.9);
  }
`
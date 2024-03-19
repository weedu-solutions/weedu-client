import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  strong {
    font-size: 32px;
    text-align: center;
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

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`

export const CustomInput = styled.div`
  margin-bottom: 20px;
`

export const CustomOption = styled.option`
  padding-top: 5px;
  padding-bottom: 5px;

  background-color: ${(props) => (props.selected ? "#3182ce" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  &:hover {
    background-color: #e2e8f0;
  }
`;

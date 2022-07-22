import styled from 'styled-components'


export const ContentGraph = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #E0DDF0;
  width: 49%;
  border-radius: 8px;

  div > h1 {
    margin-left: 60px;
    margin-top: 20px;
    color: #201F24;
    font-weight: 700;
    font-size: 25px;
  }
`
export const RowGraph = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 30px;
`

export const LegendGraph = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  p {
    color: #7A778A;
    font-weight: 500;
    margin-left: 5px;
  }
`

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;  
`

type ColorProps = {
  bgColor: string;
}

export const ColorfulFrame = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: ${(prop: ColorProps) => prop.bgColor ? prop.bgColor : ""};
  width: 16px;
  height: 16px;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;  
  align-items: center;
`



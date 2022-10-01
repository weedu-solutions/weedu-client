import styled from 'styled-components'


export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 0;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;

  h1 {
    font-weight: 600;
    font-family: 'Inter';
    font-style: normal;
    font-size: 32px;
    color: #1E163E;
  }
`
export const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Box = styled.div`
  width: 80%;
  padding: 20px;
  height: 80px;
  background-color: #FAFAFA;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #EFF0F1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content:space-between;
  margin-top: 20px;
  h1 {
    font-weight: 600;
    font-size: 20px;
  }

`

export const ButtonSeeMore = styled.button`
  background-color: #DDD5FD;
  display: flex;
  flex-direction: row;
  color: #7956F7;
  font-weight: 700;
  border-radius: 4px;
  border: 2px solid #7956F7;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  width: 150px;
  &:hover {
    filter: brightness(0.9);
  }
`
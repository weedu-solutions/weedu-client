import styled from 'styled-components'


export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Separator = styled.div`
    width: 100%;
    height: 2px;
    background-color: #EFF0F1;
`
export const Title = styled.div`
    width: 100%;
    height: 10%;
    align-items: center;
    display: flex;
    justify-content: center;
 
    h1 {
        font-weight: 700;
        font-size: 20px;
    }
`
export const SubTitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    
    h1 {
        font-size: 15px;
        font-weight: 500;
        color: #747880;
    }
`
export const Form = styled.div`
    width: 80%;
    margin-top: 20px;
`
export const Footer = styled.div`
    width: 80%;
    margin-top: 40px;
    margin-bottom: 40px;
`


import styled from 'styled-components'

type TagProps = {
    bgColor: string;
}

export const Tag = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 155px;
    height: 35px;

    border-radius: 25px;
    background-color: ${(prop: TagProps) => prop.bgColor ? prop.bgColor : ""};
`


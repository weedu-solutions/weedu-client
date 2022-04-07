import { ReactNode } from 'react'
import { Header } from './components/Header'
import { Content, Wrapper } from './styled'


export interface Props {
  children: ReactNode;
}

export default function LayoutLogged({children}: Props) {
  return (
    <Wrapper>
      <Header />
      <Content>
        {children}
      </Content>
    </Wrapper>
  )
}

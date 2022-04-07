import LayoutLogged from "../../components/LayoutLogged";
import { Content, Wrapper } from './styled'

export function Admin() {
  return (
    <LayoutLogged>
      <Wrapper>
        <div className="container">
          <Content>
            <h1>Empresas</h1>
          </Content>
        </div>
      </Wrapper>
    </LayoutLogged>
  )
}

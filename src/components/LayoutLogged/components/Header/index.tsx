import { Content, HeaderRight, Wrapper } from "./styled";
import logo from '../../../../assets/logo-min.svg'
import profile from '../../../../assets/profile.svg'

export function Header() {
  return (
    <Wrapper>
      <div className="container_header">
        <Content>
          <img src={logo} alt="logo da empresa" />
          <HeaderRight>
            <ul>
              <li><a href="">Consultores</a></li>
              <li><a href="">Empresas</a></li>
            </ul>
            <img src={profile} alt="" />
          </HeaderRight>
        </Content>
      </div>
    </Wrapper>
  )
}

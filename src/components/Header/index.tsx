import { Content, HeaderRight, Wrapper } from "./styled";
import logo from '../../assets/logo-min.svg'
import avatar from '../../assets/avatar.svg'
import { ROUTES } from "../../constants/routes";

export function Header() {
  return (
    <Wrapper>
      <div className="container_header">
        <Content>
          <img src={logo} alt="logo da empresa" />
          <HeaderRight>
            <ul>
              <li><a href={ROUTES.CONSULTANTS}>Consultores</a></li>
              <li><a href={ROUTES.CUSTOMERS}>Empresas</a></li>
            </ul>
            <img src={avatar} alt="" />
          </HeaderRight>
        </Content>
      </div>
    </Wrapper>
  )
}

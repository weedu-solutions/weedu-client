import { HiLogout } from "react-icons/hi";

import avatar from "../../assets/avatar.svg";
import logo from "../../assets/weduu.png";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/auth";
import * as S from "./styled";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <S.Wrapper>
      <S.ContainerHeader>
        <S.Content>
          <img src={logo} alt="logo da empresa" />
          {user?.user_type_id === 4 ? (
            <S.HeaderRight>
              <ul>
                <li>
                  <a href={ROUTES.CONSULTANTS}>Consultores</a>
                </li>
                <li>
                  <a href={ROUTES.CUSTOMERS}>Empresas</a>
                </li>
              </ul>
              <img src={avatar} alt="" />
            </S.HeaderRight>
          ) : (
            ""
          )}
        </S.Content>

        <S.LogoutButton onClick={() => signOut()}>
          Sair <HiLogout fill="#fff" size="20" />
        </S.LogoutButton>
      </S.ContainerHeader>
    </S.Wrapper>
  );
}

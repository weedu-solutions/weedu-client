import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/AddButton";
import LayoutLogged from "../../components/LayoutLogged";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/auth";
import { AddButtonWrapper, Content, Wrapper } from "./styles";

export function Actions() {
  const { user } = useAuth();
  const navigate = useNavigate()

  return (
    <LayoutLogged>
      <Wrapper>
        <div className="container">
          <Content>
            <h1>{user.name} {user.suname}</h1>
          </Content>
        </div>

        <AddButtonWrapper>
          <AddButton onClick={() => navigate(ROUTES.CREATE_ACTION)} />
        </AddButtonWrapper>
      </Wrapper>
    </LayoutLogged>
  )
}

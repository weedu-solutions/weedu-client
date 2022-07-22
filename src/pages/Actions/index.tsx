import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/AddButton";
import LayoutLogged from "../../components/LayoutLogged";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/auth";
import { AddButtonWrapper, Content, Separator, Wrapper } from "./styles";
import { TableActions } from "./TableActions";
import { Tooltip } from '@chakra-ui/react'
import { GraphsDash } from "./GraphsDash";

export function Actions() {
  const { user } = useAuth();
  const navigate = useNavigate()

  return (
    <LayoutLogged>
      <Wrapper>
        <div className="container">
          <Content>
            <h1>{user?.name} {user?.suname} - {user?.customer[0].fantasy_name}</h1>
          </Content>

          <GraphsDash />

          <Separator />
          <TableActions />
        </div>

        <Tooltip label='Criar plano de ação' placement='top-end' hasArrow>
          <AddButtonWrapper>
            <AddButton onClick={() => navigate(ROUTES.CREATE_ACTION)} />
          </AddButtonWrapper>
        </Tooltip>
      </Wrapper>
    </LayoutLogged>
  )
}

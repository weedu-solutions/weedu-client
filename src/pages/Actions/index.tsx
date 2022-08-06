import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/AddButton";
import LayoutLogged from "../../components/LayoutLogged";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/auth";
import { AddButtonWrapper, Content, Separator, Wrapper } from "./styles";
import { TableActions } from "./TableActions";
import { Link, Tooltip } from '@chakra-ui/react'
import { GraphsDash } from "./GraphsDash";
import iconBack from "../../assets/seta-back.svg";


export function Actions() {
  const { user } = useAuth();
  const navigate = useNavigate()
  const infoCompanyConsultant: any = JSON.parse(localStorage.getItem('company_consultant') || '{}');

  return (
    <LayoutLogged>
      <Wrapper>
        <div className="container">

          {
            user.user_type_id === 3 ?
              <Link
                color='#7956F7'
                href='/consultant-companies'
                fontSize="20px"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                width="290px"
              >
                <img src={iconBack} alt="Voltar" />
                Voltar para todas empresas
              </Link>
              : ""
          }

          {
            user.user_type_id === 3 && infoCompanyConsultant ?
              <Content>
                <h1>{infoCompanyConsultant.fantasy_name}</h1>
              </Content>
              : <Content>
                <h1>{user?.customer[0].fantasy_name}</h1>
              </Content>
          }

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

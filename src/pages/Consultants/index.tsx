import { FormLabel } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { AddButton } from '../../components/AddButton';
import LayoutLogged from "../../components/LayoutLogged";
import { ROUTES } from "../../constants/routes";
import { useFetch } from '../../hooks/useFetch';
import { AddButtonWrapper, Content, Wrapper } from "./styled";
import { TableConsultants } from "./TableConsultants";



export function Consultants() {

  const navigate = useNavigate()
  const userStorage = localStorage.getItem('user');
  const userInfoStorage = JSON.parse(String(userStorage));
  const { data } = useFetch<any>(`/auth/consultant-customer/${userInfoStorage.id}`);

  console.log(data)

  return (
    <LayoutLogged>

      <Wrapper>
        <div className="container">
          <Content>
            <FormLabel
              fontWeight="700"
              fontSize="32px"
            >
              Consultores
            </FormLabel>

            <Content>
              <TableConsultants />
            </Content>
          </Content>
        </div>

        <AddButtonWrapper>
          <AddButton onClick={() => navigate(ROUTES.REGISTER_CONSULTANT)} />
        </AddButtonWrapper>
      </Wrapper>
    </LayoutLogged>
  )
}

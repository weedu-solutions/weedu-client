import { useNavigate } from 'react-router-dom';
import LayoutLogged from "../../components/LayoutLogged";
import { Content, Wrapper, AddButtonWrapper } from "./styled";
import { AddButton } from '../../components/AddButton';
import { ROUTES } from "../../constants/routes";
import { FormLabel } from "@chakra-ui/react";
import { TableConsultants } from "./TableConsultants";



export function Consultants() {

  const navigate = useNavigate()

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

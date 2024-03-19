import { Link } from "@chakra-ui/react";
import { useEffect } from "react";

import iconBack from "../../assets/seta-back.svg";
import LayoutLogged from "../../components/LayoutLogged";
import { useAuth } from "../../hooks/auth";
import { CustomerServices } from "../../services/customer";
import { ContainerTable, Content, Separator, Wrapper } from "./styles";
import { TableActions } from "./TableActions";
import { GraphsDashUsers } from "./GrapsDashUsers";
import { GraphsDashCostumer } from "./GraphsDashCostumer";

export function Actions() {
  const { user, infoCompany } = useAuth();

  const idCustumer =
    user?.user_type_id === 3 ? infoCompany.id : user?.customer[0].id;

  useEffect(() => {
    const getData = async () => {
      const { data } = await CustomerServices.getAllUserCustomer(idCustumer);
      return localStorage.setItem("users_company", JSON.stringify(data));
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  return (
    <LayoutLogged>
      <Wrapper>
        <ContainerTable>
          {user?.user_type_id === 3 ? (
            <Link
              color="#7956F7"
              href="/consultant-companies"
              fontSize="20px"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="290px"
            >
              <img src={iconBack} alt="Voltar" />
              Voltar para todas empresas
            </Link>
          ) : (
            ""
          )}

          {user?.user_type_id === 3 && infoCompany ? (
            <Content>
              <h1>
                {infoCompany.fantasy_name} - {user?.name}
              </h1>
            </Content>
          ) : (
            <Content>
              <h1>
                {user?.customer[0].fantasy_name} - {user?.name}
              </h1>
            </Content>
          )}

          {user?.user_type_id === 1 && <GraphsDashUsers />}

          {user?.user_type_id === 2 && <GraphsDashUsers />}

          {user?.user_type_id === 3 && <GraphsDashCostumer />}

          <Separator />

          <TableActions />
        </ContainerTable>
      </Wrapper>
    </LayoutLogged>
  );
}

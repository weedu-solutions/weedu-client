import LayoutLogged from "../../components/LayoutLogged";
import { useAuth } from "../../hooks/auth";
import { useActions } from "../../hooks/useActions";
import { TableActions } from "./TableActions";
import { GraphsDashUsers } from "./GrapsDashUsers";
import { GraphsDashCostumer } from "./GraphsDashCostumer";
import * as S from "./styles";

export function Actions() {
  const { user, infoCompany } = useAuth();
  const { isLoading } = useActions();

  if (isLoading) {
    return (
      <LayoutLogged>
        <S.LoadingContainer>
          <S.LoadingText>Carregando...</S.LoadingText>
        </S.LoadingContainer>
      </LayoutLogged>
    );
  }

  return (
    <LayoutLogged>
      <S.Container>
        <S.Content>
          {/* Header */}
          <S.HeaderSection>
            <S.UserSection>
              <S.Avatar>
                {user?.name.charAt(0)}
              </S.Avatar>
              <S.UserInfo>
                <S.WelcomeText>Bem-vindo(a) de volta,</S.WelcomeText>
                <S.CompanyName>
                  {user?.user_type_id === 3 && infoCompany
                    ? infoCompany.fantasy_name
                    : user?.customer[0].fantasy_name}
                </S.CompanyName>
                <S.UserRole>
                  {user?.name}
                  <S.RoleTag>
                    {(() => {
                      switch (user?.user_type_id) {
                        case 1:
                          return "Colaborador";
                        case 2:
                          return "Gestor";
                        case 3:
                          return "Consultor";
                        case 4:
                          return "Administrador";
                        default:
                          return "Colaborador";
                      }
                    })()}
                  </S.RoleTag>
                </S.UserRole>
              </S.UserInfo>
            </S.UserSection>
          </S.HeaderSection>

          {/* Gráficos */}
          <S.ChartsSection>
            {user?.user_type_id === 3 ? (
              <GraphsDashCostumer />
            ) : (
              <GraphsDashUsers />
            )}
          </S.ChartsSection>

          {/* Board de Ações */}
          <S.BoardSection>
            <TableActions />
          </S.BoardSection>
        </S.Content>

      </S.Container>
    </LayoutLogged>
  );
}

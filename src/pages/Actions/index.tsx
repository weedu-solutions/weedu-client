import { useState } from "react";
import { HiPlus } from "react-icons/hi";

import LayoutLogged from "../../components/LayoutLogged";
import { useAuth } from "../../hooks/auth";
import { useActions } from "../../hooks/useActions";
import { TableActions } from "./TableActions";
import { GraphsDashUsers } from "./GrapsDashUsers";
import { GraphsDashCostumer } from "./GraphsDashCostumer";
import { ModalCreateAction } from "./Modals/ModalCreateAction";
import * as S from "./styles";

export function Actions() {
  const { user, infoCompany } = useAuth();
  const { actions, isLoading } = useActions();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            <S.HeaderInfo>
              <S.CompanyName>
                {user?.user_type_id === 3 && infoCompany
                  ? infoCompany.fantasy_name
                  : user?.customer[0].fantasy_name}
              </S.CompanyName>
              <S.UserName>{user?.name}</S.UserName>
            </S.HeaderInfo>

            <S.CreateButton onClick={() => setIsCreateModalOpen(true)}>
              <HiPlus size={20} />
              Plano de Ação
            </S.CreateButton>
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

        {/* Modal de criar ação */}
        {isCreateModalOpen && (
          <ModalCreateAction 
            closeModal={() => setIsCreateModalOpen(false)} 
          />
        )}
      </S.Container>
    </LayoutLogged>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import IActions from "../../../../interfaces/actions";
import { Api } from "../../../../services/api";
import { SubTitle, Title, Wrapper } from "./styles";
import { useQueryClient } from "react-query";

type ModalDisableActionProps = {
  closeModal: any;
  action: IActions | undefined;
};

export function ModalDisableAction({
  closeModal,
  action,
}: ModalDisableActionProps) {
  const [isActive, setIsActive] = useState<Number>();

  const queryClient = useQueryClient();

  const { handleSubmit } = useForm();

  //Ação ativa 1
  //Ação desativada 0
  useEffect(() => {
    function IsActionActive() {
      if (action?.is_active === 1) {
        setIsActive(0);
        return isActive;
      } else {
        setIsActive(1);
        return isActive;
      }
    }
    IsActionActive();
  }, [action?.is_active, isActive]);

  const onSubmit = async () => {
    await Api.post(`/auth/plan-is-active-plan/${action?.id}`, {
      is_active: isActive,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["all-actions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["actions-costumer"],
        });
        closeModal();
        Notify(
          NotifyTypes.SUCCESS,
          action?.is_active === 1
            ? "Seu Plano de Ação foi desativado com sucesso!"
            : "Seu Plano de Ação foi ativado com sucesso!"
        );
      })
      .catch((err: AxiosResponse) => {
        queryClient.invalidateQueries({
          queryKey: ["all-actions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["actions-costumer"],
        });
        closeModal();
        Notify(
          NotifyTypes.ERROR,
          action?.is_active === 1
            ? "Não foi possível desativar seu Plano de Ação!"
            : "Não foi possível ativar seu Plano de Ação!"
        );
      });
  };

  const handleSaveDetails = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Wrapper>
      <form>
        <Title>
          <h1>
            {action?.is_active === 1
              ? "Deseja desativar essa Ação?"
              : "Deseja ativar essa Ação?"}
          </h1>
        </Title>
        <SubTitle>
          <h1>A Ação não será excluída, podendo ser</h1>
          <h1>
            {action?.is_active === 1
              ? "Reativada novamente"
              : "Desativada novamente"}
          </h1>
        </SubTitle>
        <Button
          mt="10px"
          width="100%"
          backgroundColor="#7956F7"
          color="#FFF"
          onClick={handleSaveDetails}
        >
          Confirmar
        </Button>

        <Button
          mt="10px"
          width="100%"
          backgroundColor="#646170"
          onClick={closeModal}
          color="#FFF"
        >
          Cancelar
        </Button>
      </form>
    </Wrapper>
  );
}

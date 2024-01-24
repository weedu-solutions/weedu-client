import { Button } from "@chakra-ui/react";

import IActions from "../../../../interfaces/actions";

type IModalOption = {
  handleOpenModalStartAction: any;
  handleOpenModalSeeDetails: any;
  handleModal: any;
  handleOpenModalDisableAction: any;
  action: IActions | undefined;
};

export function ModalOptions({
  handleOpenModalStartAction,
  handleOpenModalSeeDetails,
  handleModal,
  handleOpenModalDisableAction,
  action,
}: IModalOption) {
  return (
    <>
      <Button
        mt="10px"
        width="100%"
        onClick={handleOpenModalStartAction}
        disabled={action?.end_date ? true : false}
      >
        {action?.init_date ? "Finalizar Ação" : "Começar Ação"}
      </Button>

      <Button mt="10px" width="100%" onClick={handleOpenModalSeeDetails}>
        Ver detalhes
      </Button>

      <Button mt="10px" width="100%" onClick={handleOpenModalDisableAction}>
        {action?.is_active === 1 ? "Desativar Ação" : "Ativar Ação"}
      </Button>

      <Button mt="10px" width="100%" colorScheme="red" onClick={handleModal}>
        Cancel
      </Button>
    </>
  );
}

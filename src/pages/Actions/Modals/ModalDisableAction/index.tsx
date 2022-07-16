import { Button } from "@chakra-ui/react";
import { SubTitle, Title, Wrapper } from "./styles";

type ModalDisableActionProps = {
    closeModal: any;
}

export function ModalDisableAction({ closeModal }: ModalDisableActionProps) {

    return (

        <Wrapper>
            <Title>
                <h1>
                    Deseja desativar essa ação?
                </h1>
            </Title>
            <SubTitle>
                <h1>
                    A ação não será excluída, podendo ser
                </h1>
                <h1>
                    reativada novamente
                </h1>
            </SubTitle>
            <Button
                mt="10px"
                width="100%"
                backgroundColor="#7956F7"
                color="#FFF"
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
        </Wrapper>

    )
}
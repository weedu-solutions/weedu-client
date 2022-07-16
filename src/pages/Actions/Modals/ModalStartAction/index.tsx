import { Button } from "@chakra-ui/react";
import { Separator, SubTitle, Title, Wrapper } from "./styles";
import closeModalIcon from "../../../../assets/icon-close.svg";

type ModalDisableActionProps = {
    closeModal: any;
}
export function ModalStartAction({ closeModal }: ModalDisableActionProps) {


    return (
        <>
            <Wrapper>
                <Title>
                    <div></div>
                    <div>
                        <h1>Começar ação</h1>
                    </div>
                    <div>
                        <Button colorScheme='#FFFFFF' onClick={closeModal}>
                            <img src={closeModalIcon} alt="Mais detalhes" />
                        </Button>
                    </div>
                </Title>

                <Separator />

                <SubTitle>
                    <h1>
                        Defina a data de início real da ação
                    </h1>
                </SubTitle>

                <Separator />

                <Button
                    mt="10px"
                    width="50%"
                    height="50px"
                    backgroundColor="#7956F7"
                    color="#FFF"
                >
                    Iniciar ação
                </Button>
            </Wrapper>
        </>
    )
}
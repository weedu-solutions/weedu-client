import { Button } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { ROUTES } from "../../../../constants/routes";
import IActions from "../../../../interfaces/actions";
import { Api } from "../../../../services/api";
import { SubTitle, Title, Wrapper } from "./styles";

type ModalDisableActionProps = {
    closeModal: any;
    action: IActions | undefined;
}

export function ModalDisableAction({ closeModal, action }: ModalDisableActionProps) {

    const [isActive, setIsActive] = useState<Number>();

    const {
        handleSubmit
    } = useForm();



    const onSubmit = async () => {

        if (action?.is_active === 1) {
            setIsActive(0);
        } else {
            setIsActive(1);
        }

        await Api.post(`/auth/plan-is-active-plan/${action?.id}`, {
            is_active: isActive,
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Plano de ação criado com sucesso!')
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível criar um Plano de ação.')
            });
    }
    return (

        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>
                    <h1>
                        {
                            action?.is_active === 1 ?
                                "Deseja desativar essa ação?"
                                :
                                "Deseja ativar essa ação?"
                        }
                    </h1>
                </Title>
                <SubTitle>
                    <h1>
                        A ação não será excluída, podendo ser
                    </h1>
                    <h1>
                        {
                            action?.is_active === 1 ?
                                "reativada novamente"
                                :
                                "ativada novamente"
                        }
                    </h1>
                </SubTitle>
                <Button
                    mt="10px"
                    width="100%"
                    backgroundColor="#7956F7"
                    color="#FFF"
                    onClick={() => onSubmit()}
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

    )
}
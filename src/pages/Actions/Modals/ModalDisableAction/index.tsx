/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import IActions from "../../../../interfaces/actions";
import { Api } from "../../../../services/api";
import { SubTitle, Title, Wrapper } from "./styles";

type ModalDisableActionProps = {
    closeModal: any;
    action: IActions | undefined;
}

export function ModalDisableAction({ closeModal, action }: ModalDisableActionProps) {

    const [isActive, setIsActive] = useState<Number>();
    const [isModal, setIsModal] = useState<boolean>(true);

    const {
        handleSubmit
    } = useForm();

    //Ação ativa 1
    //Ação desativada 0
    useEffect(() => {
        function IsActionActive() {
            if (action?.is_active === 1) {
                setIsActive(0)
                return isActive;
            } else {
                setIsActive(1)
                return isActive;
            }
        }
        IsActionActive()
    }, [action?.is_active, isActive]);

    const onSubmit = async () => {
        await Api.post(`/auth/plan-is-active-plan/${action?.id}`, {
            is_active: isActive,
        })
            .then((res: AxiosResponse) => {
                setIsModal(closeModal)
                window.location.reload();
                Notify(NotifyTypes.SUCCESS,
                    action?.is_active === 1 ?
                        "Seu plano de ação foi desativado com sucesso!"
                        :
                        "Seu plano de ação foi ativado com sucesso!"
                )
            })
            .catch((err: AxiosResponse) => {
                setIsModal(closeModal)
                Notify(NotifyTypes.ERROR,
                    action?.is_active === 1 ?
                        "Não foi possível desativar seu plano de ação!"
                        :
                        "Não foi possível ativar seu plano de ação!"
                )
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
                                "desativada novamente"
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
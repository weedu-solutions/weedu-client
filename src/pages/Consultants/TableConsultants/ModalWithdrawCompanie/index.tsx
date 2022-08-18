import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../../components/FormChakra/Button";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { ROUTES } from "../../../../constants/routes";
import { Api } from "../../../../services/api";

import { BodyModal, ContainerButtons } from "./styles";


interface IModal {
    isActive: any;
    consultantInfo: any;
    linkedBusinesses?: any;
    idCompanie?: number;
}


export function ModalWithdraw({ isActive, consultantInfo, linkedBusinesses, idCompanie }: IModal) {

    const navigate = useNavigate();

    const filterCompanies = linkedBusinesses.filter((it: any) => it.id !== idCompanie);

    const choseCompanies = filterCompanies.map((it: any) => it.id);

    const onSubmit = async () => {
        await Api.post(`/auth/user/${consultantInfo.id}`, {
            name: consultantInfo.name,
            suname: consultantInfo.suname,
            email: consultantInfo.email,
            is_active: consultantInfo.is_active,
            user_type_id: consultantInfo.user_type_id,
            // phone: consultantInfo.phone,
            password: 1234,
            id: consultantInfo.id,
            customer_id: [...choseCompanies]
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Dados editados com sucesso!')
                navigate(ROUTES.CONSULTANTS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível editar os dados.')
            });
    }

    return (
        <BodyModal>
            <h1>
                Retirar a empresa do consultor
            </h1>
            <h2>
                Tem certeza que deseja retirar
            </h2>
            <h2>
                o funcionário {consultantInfo.name} ?
            </h2>

            <ContainerButtons>
                <ButtonDefault
                    backgroundColor={'#7956F7'}
                    width={'100%'}
                    height={'50px'}
                    loadingText={'Retirar'}
                    title={'Retirar'}
                    onClick={() => onSubmit()}
                    type="submit"
                />
                <ButtonDefault
                    backgroundColor={'#E71D36'}
                    width={'100%'}
                    height={'50px'}
                    onClick={isActive}
                    title={'Cancelar'}
                />
            </ContainerButtons>

        </BodyModal>

    )
}

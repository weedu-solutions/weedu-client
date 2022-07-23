import { Button } from "@chakra-ui/react";
import { Separator, SubTitle, Title, Wrapper, CalendarCss, TitleModal, ErrorMessage } from "./styles";
import closeModalIcon from "../../../../assets/icon-close.svg";
import IActions from "../../../../interfaces/actions";
import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { AxiosResponse } from "axios";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { Api } from "../../../../services/api";
import { useAuth } from "../../../../hooks/auth";


type ModalDisableActionProps = {
    closeModal: any;
    action: IActions | undefined;
}
export function ModalStartAction({ closeModal, action }: ModalDisableActionProps) {
    const { user } = useAuth();
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [iscloseModal, setIsCloseModal] = useState<any>();

    function SubmitDate() {
        if (action?.init_date) {
            let chosenDate = moment(date).format('DD/MM/YYYY');
            setStartDate(action?.init_date)
            setEndDate(chosenDate)
        } else {
            let chosenDate = moment(date).format('DD/MM/YYYY');
            setStartDate(chosenDate)
            setEndDate(action?.end_date)
        }
    }

    useEffect(() => {
        SubmitDate()
    })

    const onSubmit = async () => {
        await Api.post(`/auth/plan/${action?.id}`, {
            problem: action?.problem,
            what: action?.what,
            how: action?.how,
            who: action?.who,
            why_1: action?.why_1,
            why_2: action?.why_2,
            why_3: action?.why_3,
            why_4: action?.why_4,
            why_5: action?.why_5,
            preview_init_date: action?.preview_init_date,
            preview_end_date: action?.preview_end_date,
            init_date: startDate,
            end_date: endDate,
            observation: action?.observation,
            user_id: user.id,
            customer_id: user.user_type_id,
            where: "O",
            status: action?.status,
            is_active: user.is_active
        })
            .then((res: AxiosResponse) => {
                setIsCloseModal(closeModal)
                if (action?.init_date) {
                    window.location.reload();
                    Notify(NotifyTypes.SUCCESS, 'Plano de ação iniciado com sucesso!');
                } else {
                    window.location.reload();
                    Notify(NotifyTypes.SUCCESS, 'Plano de ação finalizado com sucesso!');
                }
                return iscloseModal
            })
            .catch((err: AxiosResponse) => {
                setIsCloseModal(closeModal)
                if (action?.init_date) {
                    Notify(NotifyTypes.ERROR, 'Não foi posível iniciar o plano de ação!');
                } else {
                    Notify(NotifyTypes.ERROR, 'Não foi posível finalizar o plano de ação!');
                }
                return iscloseModal
            });
    }


    return (
        <>
            {
                <Wrapper>
                    <Title>
                        <TitleModal></TitleModal>
                        <div>
                            {
                                action?.init_date ?
                                    <h1>Finalizar ação</h1>
                                    : <h1>Iniciar ação</h1>
                            }
                        </div>

                        <div>
                            <Button colorScheme='#FFFFFF' onClick={closeModal}>
                                <img src={closeModalIcon} alt="Mais detalhes" />
                            </Button>
                        </div>
                    </Title>

                    <Separator />

                    <SubTitle>
                        {
                            action?.init_date ?
                                <h1>
                                    Defina a data de fim real da ação
                                </h1>
                                : <h1>
                                    Defina a data de início real da ação
                                </h1>
                        }
                    </SubTitle>

                    <CalendarCss>
                        <Calendar
                            onChange={setDate}
                            value={date}
                        />
                    </CalendarCss>

                    <Separator />

                    {
                        action?.init_date ?
                            endDate < action?.init_date ?
                                <ErrorMessage>Atenção a data de fim da ação, não pode ser menor que a data início.</ErrorMessage>
                                : <></>
                            : <></>
                    }

                    <Button
                        mt="10px"
                        width="50%"
                        height="50px"
                        backgroundColor="#7956F7"
                        color="#FFF"
                        onClick={() => onSubmit()}
                        disabled={
                            action?.init_date ?
                                endDate < action?.init_date ? true : false
                                : false
                        }
                    >
                        {
                            action?.init_date ?
                                "Finalizar ação"
                                : "Iniciar ação"
                        }
                    </Button>
                </Wrapper>

            }
        </>
    )
}
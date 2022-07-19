import { Button } from "@chakra-ui/react";
import { Separator, SubTitle, Title, Wrapper, CalendarCss } from "./styles";
import closeModalIcon from "../../../../assets/icon-close.svg";
import IActions from "../../../../interfaces/actions";
import Calendar from 'react-calendar';
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';

type ModalDisableActionProps = {
    closeModal: any;
    action: IActions | undefined;
}
export function ModalStartAction({ closeModal, action }: ModalDisableActionProps) {

    const [value, onChange] = useState(new Date());

    return (
        <>
            <Wrapper>
                <Title>
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

                <CalendarCss>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        activeStartDate={new Date(value)}

                    />
                </CalendarCss>

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
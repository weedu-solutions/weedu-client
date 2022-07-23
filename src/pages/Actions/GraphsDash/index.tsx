import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DunotChart from "../../../components/Charts/DunotChart";
import PieChartGH from "../../../components/Charts/PieChart";
import { useAuth } from "../../../hooks/auth";
import { ActionsServices } from "../../../services/actions";
import { Api } from "../../../services/api";
import { ColorfulFrame, ContainerRow, ContentGraph, LegendGraph, MessageDefaultChart, Row, RowGraph } from "./styles";

interface IStockStatus {
    starting: number;
    execution: number;
    executed: number;
    lateStarting: number;
    overdueFinishing: number;
}

interface IFinishedActions {
    onTime: number;
    outOfTime: number;
}

export function GraphsDash() {
    const { user } = useAuth();

    const [dataStockStatus, setDataStockStatus] = useState<IStockStatus>();
    const [dataFinishStatus, setDataFinishStatus] = useState<IFinishedActions>();

    const [pending, setPending] = useState<boolean>(false);

    useEffect(() => {
        setPending(pending => !pending);

        const getData = async () => {
            const { data } = await ActionsServices.getDataGraphic(user.customer[0].id)
            setPending(pending => !pending);
            return setDataStockStatus(data.started);
        }
        getData()

    }, []);

    useEffect(() => {
        setPending(pending => !pending);

        const getData = async () => {
            const { data } = await ActionsServices.getDataGraphic(user.customer[0].id)
            setPending(pending => !pending);
            return setDataFinishStatus(data.finished);
        }
        getData()

    }, []);

    function HaveActios() {
        if (dataStockStatus?.starting === 0 &&
            dataStockStatus?.execution === 0 &&
            dataStockStatus?.executed === 0 &&
            dataStockStatus?.lateStarting === 0 &&
            dataStockStatus?.overdueFinishing === 0) {
            return false;
        } else {
            return true;
        }
    }

    function HaveActiosFinished() {
        if (dataFinishStatus?.onTime === 0 &&
            dataFinishStatus?.outOfTime === 0) {
            return false;
        } else {
            return true;
        }
    }


    return (
        <RowGraph>
            <ContentGraph>
                <div>
                    <h1>Status das ações</h1>
                </div>

                {
                    HaveActios() === false ?
                        <MessageDefaultChart>
                            <h1>
                                <Link color='#7956F7' href='/create-action' fontSize="25px" marginRight="4px">
                                    Crie planos de ação
                                </Link>
                                para vizualizar o gráfico de status das ações.</h1>
                        </MessageDefaultChart>

                        : <ContainerRow>
                            <PieChartGH />
                            <LegendGraph>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#2EC4B6"
                                    />
                                    <p>A iniciar</p>
                                </Row>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#1C86FF"
                                    />
                                    <p>Em execução</p>
                                </Row>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#011627"
                                    />
                                    <p>Executadas</p>
                                </Row>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#FB7756"
                                    />
                                    <p>Atrasadas a iniciar</p>
                                </Row>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#E71D36"
                                    />
                                    <p>Atrasadas a terminar</p>
                                </Row>
                            </LegendGraph>
                        </ContainerRow>
                }


            </ContentGraph>

            <ContentGraph>
                <div>
                    <h1>Status das ações finalizadas</h1>
                </div>

                {
                    HaveActiosFinished() === false ?
                        <MessageDefaultChart>
                            <h1>
                                Este gráfico ficará disponível quando um plano de ação for finalizado.</h1>
                        </MessageDefaultChart>
                        :
                        <ContainerRow>
                            <DunotChart />
                            <LegendGraph>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#011627"
                                    />
                                    <p>No prazo</p>
                                </Row>
                                <Row>
                                    <ColorfulFrame
                                        bgColor="#E71D36"
                                    />
                                    <p>Fora do prazo</p>
                                </Row>
                            </LegendGraph>
                        </ContainerRow>
                }

            </ContentGraph>
        </RowGraph>
    )
}

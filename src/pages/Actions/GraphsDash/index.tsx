import { useEffect, useState } from "react";
import DunotChart from "../../../components/Charts/DunotChart";
import PieChartGH from "../../../components/Charts/PieChart";
import { useAuth } from "../../../hooks/auth";
import { ActionsServices } from "../../../services/actions";
import { Api } from "../../../services/api";
import { ColorfulFrame, ContainerRow, ContentGraph, LegendGraph, Row, RowGraph } from "./styles";


export function GraphsDash() {
    const { user } = useAuth();

    const [dataGraphStarted, setDataGraphStarted] = useState<any>();
    const [pending, setPending] = useState<boolean>(false);

    useEffect(() => {
        setPending(pending => !pending);

        const getData = async () => {
            const { data } = await ActionsServices.getDataGraphic(user.customer[0].id)
            setPending(pending => !pending);
            return setDataGraphStarted(data.finished);
        }
        getData()
        console.log(dataGraphStarted)
    }, []);



    return (
        <RowGraph>
            <ContentGraph>
                <div>
                    <h1>Status das ações</h1>
                </div>

                <ContainerRow>
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
            </ContentGraph>

            <ContentGraph>
                <div>
                    <h1>Status das ações finalizadas</h1>
                </div>
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
            </ContentGraph>
        </RowGraph>
    )
}

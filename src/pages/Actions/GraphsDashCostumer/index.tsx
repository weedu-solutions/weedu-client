import { Link } from "@chakra-ui/react";
import DunotChart from "../../../components/Charts/DunotChart";
import PieChartGH from "../../../components/Charts/PieChart";
import {
  ColorfulFrame,
  ContainerRow,
  ContentGraph,
  LegendGraph,
  MessageDefaultChart,
  Row,
  RowGraph,
} from "./styles";
import { STATUS_COLORS } from "../../../utils/statusColors";
import { useActions } from "../../../hooks/useActions";

export function GraphsDashCostumer() {
  const { graphicDataCustomer, isLoading } = useActions();

  function HaveActions() {
    if (
      graphicDataCustomer?.started?.starting === 0 &&
      graphicDataCustomer?.started?.execution === 0 &&
      graphicDataCustomer?.started?.executed === 0 &&
      graphicDataCustomer?.started?.lateStarting === 0 &&
      graphicDataCustomer?.started?.overdueFinishing === 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  function HaveActionsFinished() {
    if (
      graphicDataCustomer?.finished?.onTime === 0 &&
      graphicDataCustomer?.finished?.outOfTime === 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <RowGraph>
      <ContentGraph>
        <div>
          <h1>Status das ações</h1>
        </div>

        {HaveActions() === false ? (
          <MessageDefaultChart>
            <h1>
              <Link
                color="#7956F7"
                href="/create-action"
                fontSize="25px"
                marginRight="4px"
              >
                Crie planos de Ação
              </Link>
              para vizualizar o gráfico de status das ações.
            </h1>
          </MessageDefaultChart>
        ) : (
          <ContainerRow>
            <PieChartGH dataGraphic={graphicDataCustomer?.data?.started} />
            <LegendGraph>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.A_INICIAR} />
                <p>A iniciar</p>
              </Row>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.EM_EXECUCAO} />
                <p>Em execução</p>
              </Row>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.EXECUTADO} />
                <p>Executadas</p>
              </Row>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.ATRASADO_A_INICIAR} />
                <p>Atrasadas a iniciar</p>
              </Row>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.ATRASADO_A_TERMINAR} />
                <p>Atrasadas a terminar</p>
              </Row>
            </LegendGraph>
          </ContainerRow>
        )}
      </ContentGraph>

      <ContentGraph>
        <div>
          <h1>Status das ações finalizadas</h1>
        </div>

        {HaveActionsFinished() === false ? (
          <MessageDefaultChart>
            <h1>
              Este gráfico ficará disponível quando um Plano de Ação for
              finalizado.
            </h1>
          </MessageDefaultChart>
        ) : (
          <ContainerRow>
            <DunotChart dataGraphic={graphicDataCustomer?.data?.finished} />
            <LegendGraph>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.NO_PRAZO} />
                <p>No prazo</p>
              </Row>
              <Row>
                <ColorfulFrame bgColor={STATUS_COLORS.FORA_DO_PRAZO} />
                <p>Fora do prazo</p>
              </Row>
            </LegendGraph>
          </ContainerRow>
        )}
      </ContentGraph>
    </RowGraph>
  );
}

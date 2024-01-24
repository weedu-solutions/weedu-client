import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DunotChart from "../../../components/Charts/DunotChart";
import PieChartGH from "../../../components/Charts/PieChart";
import { useAuth } from "../../../hooks/auth";
import { ActionsServices } from "../../../services/actions";
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

  const infoCompany: any = JSON.parse(
    localStorage.getItem("company_consultant") || "{}"
  );

  useEffect(() => {
    const getGraphic = async () => {
      const { data } = await ActionsServices.getDataGraphic(user.id);
      setDataStockStatus(data.started);
      return setDataFinishStatus(data.finished);
    };

    const getGraphicCustomer = async () => {
      const { data } = await ActionsServices.getDataGraphicCustomer(
        infoCompany.id
      );
      setDataStockStatus(data.started);
      return setDataFinishStatus(data.finished);
    };

    if (user?.user_type_id === 1 || 2) {
      getGraphic();
    }

    if (user?.user_type_id === 3) {
      getGraphicCustomer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function HaveActios() {
    if (
      dataStockStatus?.starting === 0 &&
      dataStockStatus?.execution === 0 &&
      dataStockStatus?.executed === 0 &&
      dataStockStatus?.lateStarting === 0 &&
      dataStockStatus?.overdueFinishing === 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  function HaveActiosFinished() {
    if (dataFinishStatus?.onTime === 0 && dataFinishStatus?.outOfTime === 0) {
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

        {HaveActios() === false ? (
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
            <PieChartGH />
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

        {HaveActiosFinished() === false ? (
          <MessageDefaultChart>
            <h1>
              Este gráfico ficará disponível quando um Plano de Ação for
              finalizado.
            </h1>
          </MessageDefaultChart>
        ) : (
          <ContainerRow>
            <DunotChart />
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

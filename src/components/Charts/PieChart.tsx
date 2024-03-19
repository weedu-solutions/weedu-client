import { Box, SkeletonCircle } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { STATUS_COLORS } from "../../utils/statusColors";

export interface IPieChartGHData {
  dataGraphic: {
    executed: number;
    execution: number;
    lateStarting: number;
    overdueFinishing: number;
    starting: number;
  };
}

export default function PieChartGH(dataGraphic: IPieChartGHData) {

  const data = [
    { name: "A iniciar", value: dataGraphic?.dataGraphic?.starting },
    { name: "Em execução", value: dataGraphic?.dataGraphic?.execution },
    { name: "Executadas", value: dataGraphic?.dataGraphic?.executed },
    {
      name: "Atrasadas a iniciar",
      value: dataGraphic?.dataGraphic?.lateStarting,
    },
    {
      name: "Atrasadas a terminar",
      value: dataGraphic?.dataGraphic?.overdueFinishing,
    },
  ];

  const COLORS = [
    STATUS_COLORS.A_INICIAR,
    STATUS_COLORS.EM_EXECUCAO,
    STATUS_COLORS.EXECUTADO,
    STATUS_COLORS.ATRASADO_A_INICIAR,
    STATUS_COLORS.ATRASADO_A_TERMINAR,
  ];

  return (
    <>
      {dataGraphic ? (
        <PieChart width={350} height={280}>
          <Pie
            data={data}
            cx={150}
            cy={135}
            outerRadius={80}
            isAnimationActive={false}
            fill="#8884d8"
            dataKey="value"
            label
            activeIndex={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <Box paddingLeft="12" paddingRight="20">
          <SkeletonCircle size="40" />
        </Box>
      )}
    </>
  );
}

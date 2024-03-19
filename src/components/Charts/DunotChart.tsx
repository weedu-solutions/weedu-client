import { Box, SkeletonCircle } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { STATUS_COLORS } from "../../utils/statusColors";

export interface IDataDunotChart {
  dataGraphic: {
    onTime: number;
    outOfTime: number;
  }
}

export default function DunotChart(dataGraphic: IDataDunotChart) {

  const data = [
    { name: "No prazo", value: dataGraphic?.dataGraphic?.onTime },
    { name: "Fora do prazo", value: dataGraphic?.dataGraphic?.outOfTime },
  ];

  const COLORS = [STATUS_COLORS.NO_PRAZO, STATUS_COLORS.FORA_DO_PRAZO];

  return (
    <>
      {dataGraphic ? (
        <PieChart width={350} height={280}>
          <Pie
            data={data}
            cx={150}
            cy={135}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            isAnimationActive={false}
            dataKey="value"
            label
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

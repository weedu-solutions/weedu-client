import { useActions } from "../../../hooks/useActions";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "./styles";

export function GraphsDashUsers() {
  const { graphicData, isLoading } = useActions();

  const statusData = [
    { name: "A iniciar", value: graphicData?.data?.started?.starting || 0 },
    { name: "Em execução", value: graphicData?.data?.started?.execution || 0 },
    { name: "Executadas", value: graphicData?.data?.started?.executed || 0 },
    { name: "Atrasadas a iniciar", value: graphicData?.data?.started?.lateStarting || 0 },
    { name: "Atrasadas a terminar", value: graphicData?.data?.started?.overdueFinishing || 0 },
  ];

  const finishedData = [
    { name: "No prazo", value: graphicData?.data?.finished?.onTime || 0 },
    { name: "Fora do prazo", value: graphicData?.data?.finished?.outOfTime || 0 },
  ];

  const COLORS_STATUS = [
    '#8B5CF6',
    '#3B82F6',
    '#2DD4BF',
    '#FB7185',
    '#EF4444',
  ];
  
  const COLORS_FINISHED = [
    '#10B981',
    '#EF4444',
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <S.TooltipContainer>
          <S.TooltipLabel>{payload[0].name}</S.TooltipLabel>
          <S.TooltipValue>{payload[0].value}</S.TooltipValue>
        </S.TooltipContainer>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#64748B"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="14"
        fontWeight="500"
      >
        {value}
      </text>
    );
  };

  if (isLoading) {
    return <S.Container>Carregando...</S.Container>;
  }

  return (
    <S.Container>
      <S.GraphCard>
        <S.GraphHeader>Status das ações</S.GraphHeader>
        <S.GraphContent>
          <S.ChartWrapper>
            <S.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS_STATUS[index]} 
                        style={{
                          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>
            <S.LegendContainer>
              {statusData.map((entry, index) => (
                <S.LegendItem key={`legend-${index}`}>
                  <S.ColorBox color={COLORS_STATUS[index]} />
                  <span>{entry.name}</span>
                </S.LegendItem>
              ))}
            </S.LegendContainer>
          </S.ChartWrapper>
        </S.GraphContent>
      </S.GraphCard>

      <S.GraphCard>
        <S.GraphHeader>Status das ações finalizadas</S.GraphHeader>
        <S.GraphContent>
          <S.ChartWrapper>
            <S.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={finishedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {finishedData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS_FINISHED[index]} 
                        style={{
                          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>
            <S.LegendContainer>
              {finishedData.map((entry, index) => (
                <S.LegendItem key={`legend-${index}`}>
                  <S.ColorBox color={COLORS_FINISHED[index]} />
                  <span>{entry.name}</span>
                </S.LegendItem>
              ))}
            </S.LegendContainer>
          </S.ChartWrapper>
        </S.GraphContent>
      </S.GraphCard>
    </S.Container>
  );
}

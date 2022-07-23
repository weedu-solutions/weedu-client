import { Box, SkeletonCircle } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useAuth } from "../../hooks/auth";
import { ActionsServices } from "../../services/actions";

interface IFinishedActions {
  onTime: number;
  outOfTime: number;
}


export default function DunotChart() {
  const { user } = useAuth();

  const [datafinishedActions, setDataFinishedActions] = useState<IFinishedActions>();
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    setPending(pending => !pending);

    const getData = async () => {
      const { data } = await ActionsServices.getDataGraphic(user.customer[0].id)
      setPending(pending => !pending);
      return setDataFinishedActions(data.finished);
    }
    getData()

  }, []);

  const data = [
    { name: "No prazo", value: datafinishedActions?.onTime },
    { name: "Fora do prazo", value: datafinishedActions?.outOfTime },
  ];

  const COLORS = ["#011627", "#E71D36"];

  return (
    <>
      {
        !pending ?
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          : <Box
            paddingLeft='12'
            paddingRight='20'
          >
            <SkeletonCircle size='40' />
          </Box>
      }
    </>
  );
}

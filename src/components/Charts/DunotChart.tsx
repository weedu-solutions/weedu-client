import { Box, SkeletonCircle } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useAuth } from "../../hooks/auth";
import { ActionsServices } from "../../services/actions";
import { STATUS_COLORS } from "../../utils/statusColors";

interface IFinishedActions {
  onTime: number;
  outOfTime: number;
}

export default function DunotChart() {
  const { user } = useAuth();

  const [datafinishedActions, setDataFinishedActions] =
    useState<IFinishedActions>();
  const [pending, setPending] = useState<boolean>(false);

  const infoCompany: any = JSON.parse(
    localStorage.getItem("company_consultant") || "{}"
  );

  useEffect(() => {
    setPending(true);

    const getGraphic = async () => {
      const { data } = await ActionsServices.getDataGraphic(user.id);
      setPending(false);
      return setDataFinishedActions(data.finished);
    };

    const getGraphicCustomer = async () => {
      const { data } = await ActionsServices.getDataGraphicCustomer(
        infoCompany.id
      );
      setPending(false);
      return setDataFinishedActions(data.finished);
    };

    if (user?.user_type_id === 1 || 2) {
      getGraphic();
    }

    if (user?.user_type_id === 3) {
      getGraphicCustomer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    { name: "No prazo", value: datafinishedActions?.onTime },
    { name: "Fora do prazo", value: datafinishedActions?.outOfTime },
  ];

  const COLORS = [STATUS_COLORS.NO_PRAZO, STATUS_COLORS.FORA_DO_PRAZO];

  return (
    <>
      {!pending ? (
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

import { Box, SkeletonCircle } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useAuth } from "../../hooks/auth";
import { ActionsServices } from "../../services/actions";


interface IStockStatus {
    starting: number;
    execution: number;
    executed: number;
    lateStarting: number;
    overdueFinishing: number;
}

export default function PieChartGH() {
    const { user } = useAuth();

    const [dataStockStatus, setDataStockStatus] = useState<IStockStatus>();
    const [pending, setPending] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const infoCompany: any = JSON.parse(localStorage.getItem('company_consultant') || '{}');


    useEffect(() => {
        setPending(true);

        const getGraphic = async () => {
            const { data } = await ActionsServices.getDataGraphic(user.id)
            setPending(false);
            return setDataStockStatus(data.started);
        }

        const getGraphicCustomer = async () => {
            const { data } = await ActionsServices.getDataGraphicCustomer(infoCompany.id)
            setPending(false);
            return setDataStockStatus(data.started);
        }

        if (user.user_type_id === 1 || 2) {
            getGraphic()            
        } 
        if (user.user_type_id === 3) {
            getGraphicCustomer()
        }
        

    }, []);

    const data = [
        { name: "A iniciar", value: dataStockStatus?.starting },
        { name: "Em execução", value: dataStockStatus?.execution },
        { name: "Executadas", value: dataStockStatus?.executed },
        { name: "Atrasadas a iniciar", value: dataStockStatus?.lateStarting },
        { name: "Atrasadas a terminar", value: dataStockStatus?.overdueFinishing },
    ];

    const COLORS = ["#2EC4B6", "#1C86FF", "#011627", " #FB7756", "#E71D36"];

    return (
        <>
            {
                !pending ?
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
                            activeIndex={activeIndex}

                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    :
                    <Box
                        paddingLeft='12'
                        paddingRight='20'
                    >
                        <SkeletonCircle size='40' />
                    </Box>

            }
        </>
    );
}

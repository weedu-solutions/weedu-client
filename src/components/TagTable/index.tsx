import { Tag } from "./styles"
import { Text } from "@chakra-ui/react"

type ITagTable = {
    status: number;
    rowInfo?: any;
}


export function TagTable({ status, rowInfo }: ITagTable) {

    return (
        <Tag
            bgColor={
                rowInfo.is_active === 0 ?
                    "#EFF1F1"
                    :
                    status === 1 ? "#CDF1ED" :
                        status === 2 ? "#C9E2FC" :
                            status === 3 ? "#EFF1F1" :
                                status === 6 ? "#D3D7DA" :
                                    status === 4 ? "#FADED6" :
                                        status === 5 ? "#F7C9CF" :
                                            "#1E163E"
            }
        >
            <Text
                color={
                    rowInfo.is_active === 0 ?
                        "#9AA8B3"
                        :
                        status === 1 ? "#378479" :
                            status === 2 ? "#2185F6" :
                                status === 3 ? "#9AA8B3" :
                                    status === 6 ? "#485763" :
                                        status === 4 ? "#F07655" :
                                            status === 5 ? "#E83737" :
                                                "#FFFFFF"
                }
                fontSize="14px"
                fontWeight="500"
            >
                {
                    rowInfo.is_active === 0 ?
                        "Desativado"
                        :
                        status === 1 ? "A iniciar" :
                            status === 2 ? "Em execução" :
                                status === 3 ? "Executado" :
                                    status === 4 ? "Atrasado - A iniciar" :
                                        status === 5 ? "Atrasado - A terminar" :
                                            status === 6 ? "Desativado" :
                                                status
                }
            </Text>
        </Tag>
    )
}

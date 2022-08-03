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
                    status === 0 ? "#CDF1ED" :
                        status === 1 ? "#C9E2FC" :
                            status === 2 ? "#EFF1F1" :
                                status === 3 ? "#D3D7DA" :
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
                        status === 0 ? "#378479" :
                            status === 1 ? "#2185F6" :
                                status === 2 ? "#9AA8B3" :
                                    status === 3 ? "#485763" :
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
                        status === 0 ? "A iniciar" :
                            status === 1 ? "Em execução" :
                                status === 2 ? "Desativado" :
                                    status === 3 ? "Executado" :
                                        status === 4 ? "Atrasado - A iniciar" :
                                            status === 5 ? "Atrasado - A terminar" :
                                                status
                }
            </Text>
        </Tag>
    )
}

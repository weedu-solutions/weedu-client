import { Tag } from "./styles"
import { Text } from "@chakra-ui/react"

type ITagTable = {
    prop: number;
}


export function TagTable({ prop }: ITagTable) {

    return (
        <Tag
            bgColor={
                prop === 1 ? "#FADED6" :
                    prop === 2 ? "#F7C9CF" :
                        prop === 3 ? "#CDF1ED" :
                            prop === 4 ? "#C9E2FC" :
                                prop === 5 ? "#D3D7DA" :
                                    prop === 6 ? "#EFF1F1" :
                                        "#1E163E"
            }
        >
            <Text
                color={
                    prop === 1 ? "#F07655" :
                        prop === 2 ? "#E83737" :
                            prop === 3 ? "#378479" :
                                prop === 4 ? "#2185F6" :
                                    prop === 5 ? "#485763" :
                                        prop === 6 ? "#9AA8B3" :
                                            "#FFFFFF"
                }
                fontSize="14px"
                fontWeight="500"
            >
                {
                    prop === 1 ? "A iniciar" :
                        prop === 2 ? "Em execução" :
                            prop === 3 ? "Executada" :
                                prop === 4 ? "Atrasada - A iniciar" :
                                    prop === 5 ? "Atrasada - A terminar" :
                                        prop === 6 ? "Desa" :
                                            prop
                }
            </Text>
        </Tag>
    )
}

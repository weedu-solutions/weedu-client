import { Tag } from "./styles"
import { Text } from "@chakra-ui/react"

type ITagTable = {
    prop: number;
}


export function TagTable({ prop }: ITagTable) {

    return (
        <Tag
            bgColor={
                prop === 4 ? "#FADED6" :
                    prop === 5 ? "#F7C9CF" :
                        prop === 0 ? "#CDF1ED" :
                            prop === 1 ? "#C9E2FC" :
                                prop === 3 ? "#D3D7DA" :
                                    prop === 2 ? "#EFF1F1" :
                                        "#1E163E"
            }
        >
            <Text
                color={
                    prop === 4 ? "#F07655" :
                        prop === 5 ? "#E83737" :
                            prop === 0 ? "#378479" :
                                prop === 1 ? "#2185F6" :
                                    prop === 3 ? "#485763" :
                                        prop === 2 ? "#9AA8B3" :
                                            "#FFFFFF"
                }
                fontSize="14px"
                fontWeight="500"
            >
                {
                    prop === 0 ? "A iniciar" :
                        prop === 1 ? "Em execução" :
                            prop === 3 ? "Executado" :
                                prop === 4 ? "Atrasado - A iniciar" :
                                    prop === 5 ? "Atrasado - A terminar" :
                                        prop === 2 ? "Desativado" :
                                            prop
                }
            </Text>
        </Tag>
    )
}

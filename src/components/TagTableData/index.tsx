import { Tag } from "./styles"
import { Text } from "@chakra-ui/react"

type ITagTable = {
    date: number;
}


export function TagTableData({ date }: ITagTable) {

    return (
        <Tag
            bgColor={"#1E163E"}
        >
            <Text
                color={"#FFFFFF"}
                fontSize="14px"
                fontWeight="500"
            >
                {date}
            </Text>
        </Tag>
    )
}

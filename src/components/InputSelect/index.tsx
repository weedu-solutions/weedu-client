import { Box, Text, Select, ISelectProps } from "native-base";

interface IProps extends ISelectProps {
  title: string;
}

export function InputSelect(props: IProps) {
  return (
    <Box width={props.w} marginBottom={8} marginRight={props.marginRight}>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="700"
        marginRight={2}
        paddingRight="5%"
      >
        {props.title}
      </Text>
      <Select
        borderRadius="4px"
        height="56px"
        fontFamily="Inter"
        fontSize="16px"
        placeholder={props.placeholder}
        bgColor="neutral.medium"
        borderColor="neutral.darker"
      >
        <Select.Item label="teste" value="t"/>
      </Select>
    </Box>
  );
}

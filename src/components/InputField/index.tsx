import { Box, Text, Input, IInputProps } from "native-base";

interface IProps extends IInputProps {
  title: string;
}

export function InputField(props: IProps) {
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
      <Input
        borderRadius="4px"
        height="56px"
        placeholder={props.placeholder}
        fontFamily="Inter"
        fontSize="16px"
      />
    </Box>
  );
}

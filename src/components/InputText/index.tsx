import { Box, Text, Input, IInputProps } from "native-base";

interface IProps extends IInputProps {
  title?: string;
}

export function InputText(props: IProps) {
  return (
    <Box w="100%" alignItems="flex-start" marginBottom={4}>
      <Text color="neutral.darker" fontFamily="Inter" fontSize="16px" fontWeight="700" marginBottom={2}>{props.title}</Text>

      <Input
        borderColor="#EFF0F1"
        minH="56px"
        width="100%"
        _focus={{ borderColor: "#9B80F9" }}
        fontSize="16px"
        {...props}
      />
    </Box>
  );
}

import { Box, Button, IInputProps } from "native-base";

interface IProps extends IInputProps {
  title?: string;
}

export function CustomButton(props: IProps) {
  return (
    <Box w="100%" marginY={8}>
      <Button
        bgColor="primary.medium"
        borderColor="#EFF0F1"
        minH="56px"
        maxW="520px"
        _focus={{ borderColor: "#9B80F9" }}
        fontSize="16px"
        fontFamily="Inter"
        fontWeight="700"
        {...props}
        isLoadingText="Entrando..."
      >
        {props.title}
      </Button>
    </Box>
  )
}

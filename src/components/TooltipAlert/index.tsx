import {
  Alert,
  Center,
  HStack,
  Stack,
  VStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";

export function TooltipAlert() {
  const statusArr = [
    { status: "success", message: "Isso foi feito com sucesso" },
    { status: "error", message: "Tente novamente" },
    { status: "info", message: "Isso estára disponível em breve" },
    { status: "warning", message: "Conexão de internet perdida" },
  ];

  return (
    <Center position="fixed" top="10vh" right="5vw">
      <Stack space={3} w="90%" maxWidth="400">
        {statusArr.map((status) => (
          <Alert w="100%" status={status.status}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md">{status.message}</Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size={3} color="coolGray.600" />}
                />
              </HStack>
            </VStack>
          </Alert>
        ))}
      </Stack>
    </Center>
  );
}

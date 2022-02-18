import { Box, Button, Text } from "native-base";
import { useCallback, useState } from "react";
import { CustomButton } from "../CustomButton";
import { InputText } from "../InputText";

export function AuthBox() {
  const [show, setShow] = useState(true);

  const handleClick = useCallback(() => setShow(!show), [show]);

  return (
    <Box>
      <Box
        bgColor="#fff"
        paddingY="24px"
        paddingX="40px"
        maxW="600px"
        maxH="500px"
        borderTopRadius={8}
        alignItems="center"
      >
        <Text
          fontFamily="Inter"
          fontWeight="700"
          fontSize="34px"
          color="primary.darker"
        >
          Bem vindo de volta!
        </Text>

        <InputText title="E-mail" placeholder="Digite seu e-mail aqui" />
        <InputText
          title="Senha"
          placeholder="Digite sua senha aqui"
          type={show ? "text" : "password"}
          InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" bgColor="neutral.medium" >{show ? "Esconder" : "Mostrar"}</Button>
          }
        />

        <CustomButton title="Entrar" />
      </Box>
      <Box
        bgColor="#EFF0F1"
        w="100%"
        maxH="56px"
        alignItems="center"
        justifyContent="center"
        borderBottomRadius={8}
        padding={4}
      >
        <Text fontSize="12px" color="primary.darker">
          SEUS GERENCIAMENTOS DE FORMA CENTRALIZADA!
        </Text>
      </Box>
    </Box>
  );
}

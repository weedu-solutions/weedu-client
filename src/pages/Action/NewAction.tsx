import { Box, Image, Text, Input, Button } from "native-base";
import BgImg from "../../assets/actionBG.png";
import { InputField } from "../../components/InputField";
import { InputSelect } from "../../components/InputSelect";

export function NewAction() {
  return (
    <Box
      w="100%"
      h="100vh"
      position="fixed"
      zIndex={3}
      flexDir="row"
      bgColor="#fff"
    >
      <Image
        source={{ uri: BgImg }}
        width="100%"
        height="100%"
        resizeMode="cover"
      />
      <Box
        bgColor="#fff"
        h="100vh"
        alignItems="center"
        width="50%"
        paddingY={8}
        paddingX={32}
        position="absolute"
        right={0}
      >
        <Text
          fontFamily="Inter"
          fontSize="32px"
          fontWeight="700"
          marginRight={2}
          paddingRight="5%"
        >
          Adicionar uma nova ação
        </Text>

        <InputField
          w="100%"
          title="Qual o problema ou causa que será tratado?"
          placeholder="Informe o problema ou causa"
        />

        <InputField
          w="100%"
          title="O que será feito (What?)"
          placeholder="Informe o problema ou causa"
        />
        <InputField
          w="100%"
          title="Como irá realizar esta ação (passo a passo) (How?)"
          placeholder="Informe o problema ou causa"
        />

        <InputSelect
          w="100%"
          title="Responsável pela ação (Who?)"
          placeholder="Nome de quem preencheu"
        />

        <Box
          flexDir="row"
          alignItems="center"
          padding={0}
          alignSelf="flex-start"
          marginBottom={8}
        >
          <InputField
            title="Inicio Previsto (When?)"
            placeholder="dd/mm/aaaa"
            marginRight={4}
          />
          <InputField title="Fim Previsto (When?)" placeholder="dd/mm/aaaa" />
        </Box>

        <InputField
          w="100%"
          title="Observações"
          placeholder="Informe observações relevantes para execução do projeto"
        />

        <Box w="100%" flexDir="row" alignItems="center" justifyContent="center">
          <Button
            minW="200px"
            minH="72px"
            bgColor="neutral.dark"
            fontSize={"20px"}
            fontFamily="Inter"
            fontWeight="700"
            marginRight={4}
          >
            Cancelar
          </Button>
          <Button
            minW="200px"
            minH="72px"
            bgColor="primary.medium"
            fontSize={"20px"}
            fontFamily="Inter"
            fontWeight="700"
          >
            Confimar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

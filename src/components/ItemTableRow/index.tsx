import { Box, Button, Text } from "native-base";
import { theme } from "../../theme";
import { BadgeStatus, BageTypes } from "../BadgeStatus";

interface IItemTableRowProps {
  status: BageTypes;
}

export function ItemTableRow({ status }: IItemTableRowProps) {
  return (
    <Box
      flex={1}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="#E0DDF0"
      paddingY="12px"
    >
      <BadgeStatus type={status} />

      <Box maxWidth="280px">
        <Text>
          Baixa conversão de smart lead para MQL. Os negócios dos Prospectores
          que sairam da empresa ficam sem "dono"...
        </Text>
      </Box>

      <Box
        width="120px"
        height="40px"
        borderRadius="16px"
        bgColor="primary.darker"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontFamily="Inter"
          fontWeight="700"
          fontSize="12px"
          color="neutral.ligther"
        >
          00/00/2022
        </Text>
      </Box>

      <Box
        width="120px"
        height="40px"
        borderRadius="16px"
        bgColor="primary.darker"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontFamily="Inter"
          fontWeight="700"
          fontSize="12px"
          color="neutral.ligther"
        >
          00/00/2022
        </Text>
      </Box>

      <Box maxWidth="150px">
        <Text>Lorem Ipsum Dolor Sit</Text>
      </Box>

      <Box maxWidth="150px">
        <Button
          variant="outline"
          borderColor={theme.colors.primary.ligther}
          bgColor={theme.colors.primary.ligther}
          _text={{
            color: "#392D8B",
          }}
          _hover={{
            bgColor: theme.colors.primary.ligther,
            borderColor: theme.colors.primary.ligther,
          }}
        >
          Ver detalhes
        </Button>
      </Box>
      <Box maxWidth="150px">
        <Button
          variant="outline"
          borderColor={theme.colors.primary.ligther}
          bgColor={theme.colors.info.medium}
          _text={{
            color: theme.colors.neutral.ligth,
          }}
          _hover={{
            bgColor: theme.colors.info.dark,
            borderColor: theme.colors.primary.ligther,
          }}
        >
          Comerçar projeto
        </Button>
      </Box>
    </Box>
  );
}

import { Box, Button, HamburgerIcon, Menu, Pressable, Text } from "native-base";
import { theme } from "../../theme";
import { BadgeStatus, BageTypes } from "../BadgeStatus";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IItemTableRowProps {
  status: BageTypes;
}

export function ItemTableRow({ status }: IItemTableRowProps) {
  function DetailsButtonActionMenu() {
    return (
      <Box h="80%" w="90%" alignItems="flex-start">
        <Menu
          w="190"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <BsThreeDotsVertical />
              </Pressable>
            );
          }}
        >
          <Menu.Item>Começar ação</Menu.Item>
          <Menu.Item>Ver detalhes</Menu.Item>
          <Menu.Item isDisabled>Excluir ação</Menu.Item>
        </Menu>
      </Box>
    );
  }

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
      <Box w="180px">
        <BadgeStatus type={status} />
      </Box>

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
          borderColor="primary.dark"
          bgColor={theme.colors.primary.ligther}
          _text={{
            color: "#392D8B",
          }}
          _hover={{
            bgColor: theme.colors.primary.ligther,
            borderColor: theme.colors.primary.ligther,
          }}
        >
          <DetailsButtonActionMenu />
        </Button>
      </Box>
    </Box>
  );
}

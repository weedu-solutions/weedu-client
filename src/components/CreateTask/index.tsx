import { Box, Fab } from "native-base";
import { TiPlus } from "react-icons/ti";
import { theme } from "../../theme";

export function CreateTask() {
  return (
    <Fab
      renderInPortal={false}
      shadow={20}
      right="18%"
      bottom="15%"
      position="fixed"
      size="sm"
      bgColor={theme.colors.primary.medium}
      zIndex={2}
      icon={
        <Box flexDir="row" alignItems="center">
          <TiPlus color="#fff" size="32" />
        </Box>
      }
      placement="bottom-right"
    />
  );
}

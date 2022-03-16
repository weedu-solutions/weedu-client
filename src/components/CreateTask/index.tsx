import { Box, Fab } from "native-base";
import { TiPlus } from "react-icons/ti";
import { theme } from "../../theme";

export function CreateTask() {
  return (
    <Fab
      renderInPortal={false}
      shadow={20}
      right={70}
      bottom={50}
      position="fixed"
      size="sm"
      bgColor={theme.colors.primary.medium}
      icon={
        <Box flexDir="row" alignItems="center">
          <TiPlus color="#fff" size="32" />
        </Box>
      }
      placement="bottom-right"
    />
  );
}

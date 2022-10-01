import { Box, Image } from "native-base";
import WeedoLogo from "../../../../assets/logo.svg";

export function Header() {
  return (
    <Box position="absolute" top={0} alignItems="flex-start" padding={4} w="100%">
      <Image src={WeedoLogo} width="230px" height="44px" />
    </Box>
  );
}

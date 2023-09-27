import { Box } from "native-base";

import WeedoLogo from "../../../../assets/weedu-logo.png";

export function Header() {
  return (
    <Box position="absolute" top={0} alignItems="flex-start" padding={4} w="100%">
      <img src={WeedoLogo} width={'12%'} alt="logo-weedu"/>
    </Box>
  );
}

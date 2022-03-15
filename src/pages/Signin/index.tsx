import { Box, Image } from "native-base";
import { AuthBox } from "../../components/AuthBox";
import { Hearder } from "../../components/Header";

import Background from "../../assets/bg.svg";

export function Signin() {
  return (
    <Box
      bgColor="primary.dark"
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Image source={{ uri: Background }} width='100%'height='100%' position="absolute"/>
        <Hearder />
        <AuthBox />
    </Box>
  );
}

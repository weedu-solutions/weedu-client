import { Box, Button, Image } from "native-base";
import { AiFillCaretDown } from "react-icons/ai";
import WeedoLogo from "../../assets/logo2.svg";
import { SpacerComponent } from "../Spacer";

export function DashHeader() {
  return (
    <Box
      borderBottomWidth={1}
      borderBottomColor="#E0DDF0"
      maxH="79px"
      paddingY={6}
      width="100%"
      alignItems="center"
    >
      <Box
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        maxWidth={1200}
        width={1200}
        minWidth={800}
      >
        <Image src={WeedoLogo} width="115px" height="22px" />
        <Box>
          <Button
            variant="ghost"
            endIcon={<AiFillCaretDown color="#392D8B" />}
            _text={{
              color: "#392D8B",
            }}
            _hover={{
              bgColor: "#fff",
            }}
          >
            Cadastros
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

import { Link } from "@chakra-ui/react";
import { Message } from "../styles";

export const WelcomeToWeeduAction = () => {
  return (
    <Message>
      <h1>Seja bem-vindo(a) ao Weedu !</h1>
      <Link color="#7956F7" href="/create-action" fontSize="20px">
        Clique aqui para criar um Plano de Ação
      </Link>
    </Message>
  );
};

import { Wrapper } from "./styled";
import inactiveIcon from "../../assets/inactive-user-icon.svg";

export function InactiveUser() {
  return (
    <Wrapper>
      <img src={inactiveIcon} alt="" />
      <strong>Usuário bloqueado</strong>
      <h3>Seu acesso está temporariamente suspenso. Por favor, entre em contato com a Weedu.</h3>
      <p>SEUS GERENCIAMENTOS DE FORMA CENTRALIZADA!</p>
    </Wrapper>
  )
}

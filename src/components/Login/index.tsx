import { useState } from 'react';
import { Button } from '../Button'
import { InputText } from '../InputText'
import { Wrapper } from './styled'

export function LoginComponent() {
  const [show, setShow] = useState(true);

  return (
    <Wrapper>
      <strong>Bem vindo de volta!</strong>
      <InputText title="E-mail" placeholder="Digite seu e-mail aqui" />
      <InputText
        title="Senha"
        placeholder="Digite sua senha aqui"
        type={show ? "text" : "password"}
        // InputRightElement={
        //   <Button size="xs" rounded="none" w="1/6" h="full" bgColor="neutral.medium" >{show ? "Esconder" : "Mostrar"}</Button>
        // }
      />
      <Button title="Entrar" />
      <p>SEUS GERENCIAMENTOS DE FORMA CENTRALIZADA!</p>
    </Wrapper>
  )
}

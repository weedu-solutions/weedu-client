import { useState } from 'react';
import { Button } from '../Button'
import { InputText } from '../InputText'
import { Wrapper } from './styled'
import { useAuth } from '../../hooks/auth'

export interface InputsValues {
  email: string;
  password: string;
}

export function LoginComponent() {
  const [values, setValues] = useState<InputsValues>({email: '', password: ''});
  const { signIn } = useAuth();

  function handleSubmit() {
    signIn(values)
  }

  return (
    <Wrapper>
      <strong>Bem vindo de volta!</strong>
      <InputText 
        title="E-mail" 
        value={values.email ?? ''}
        onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
        placeholder="Digite seu e-mail aqui"
        type="email"
        />
      <InputText
        title="Senha"
        value={values.password ?? ''}
        onChange={(event: any) => setValues({ ...values, password: String(event.target.value) })}
        placeholder="Digite sua senha aqui"
        type="password"
      />
      <Button disabled={!(values.email && values.password)} onClick={handleSubmit} title="Entrar" />
      <p>SEUS GERENCIAMENTOS DE FORMA CENTRALIZADA!</p>
    </Wrapper>
  )
}

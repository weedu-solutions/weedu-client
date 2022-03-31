import { useState } from 'react';
import { Button } from '../../../Button'
import { InputText } from '../../../InputText'
import { Wrapper } from './styled'
import { useAuth } from '../../../../hooks/auth'

export interface InputsValues {
  email: string;
  password: string;
}

interface Props {
  onClick: () => void;
}

export function Login({onClick}: Props) {
  const [values, setValues] = useState<InputsValues>({email: '', password: ''});
  const { signIn, error, loading } = useAuth();

  function handleSubmit() {
    signIn(values, "/dashboard")
  }

  return (
    <Wrapper>
      <strong>Bem vindo de volta!</strong>
      <InputText 
        title="E-mail" 
        isInvalid={error ? true : false}
        value={values.email ?? ''}
        onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
        placeholder="Digite seu e-mail aqui"
        type="email"
        />
        {error && error === "Usuário não foi encontrado" && <span>{error}</span>}
      <InputText
        title="Senha"
        isInvalid={error ? true : false}
        value={values.password ?? ''}
        onChange={(event: any) => setValues({ ...values, password: String(event.target.value) })}
        placeholder="Digite sua senha aqui"
        type="password"
        />
        {error && error !== "Usuário não foi encontrado" && <span>{error}</span>}
      <Button disabled={!(values.email && values.password)} onClick={handleSubmit} title={loading ? "Carregando..." : "Entrar"} />
      <button className="login_forgot_button" onClick={onClick}>Esqueci minha senha</button>
    </Wrapper>
  )
}

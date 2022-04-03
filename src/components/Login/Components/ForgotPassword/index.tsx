import { useState } from 'react';
import { Button } from '../../../Button'
import { InputText } from '../../../InputText'
import { Wrapper } from './styled'
import { useAuth } from '../../../../hooks/auth'

export interface InputsValues {
  email: string;
}

export function ForgotPassword() {
  const [email, setEmail] = useState<InputsValues>({email: ""});
  const { error, loading, recover } = useAuth();

  function handleSubmit() {
    recover(email)
  }

  return (
    <Wrapper>
      <strong>Esqueceu sua senha?</strong>
      <h3>Informe seu email para conseguirmos prosseguir<br/>com o a recuperacao da sua senha</h3>
      <InputText 
        title="E-mail" 
        isInvalid={error ? true : false}
        value={email.email ?? ''}
        onChange={(event: any) => setEmail({ ...email, email: String(event.target.value) })}
        placeholder="Digite seu e-mail aqui"
        type="email"
        />
        {error && error === "Usuário não foi encontrado" && <span>{error}</span>}
      <Button disabled={!email.email} onClick={handleSubmit} title={loading ? "Carregando..." : "Recuperar senha"} />
    </Wrapper>
  )
}

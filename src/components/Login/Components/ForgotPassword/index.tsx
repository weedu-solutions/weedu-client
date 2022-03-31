import { useState } from 'react';
import { Button } from '../../../Button'
import { InputText } from '../../../InputText'
import { Wrapper } from './styled'
import { useAuth } from '../../../../hooks/auth'

export interface InputsValues {
  email: string;
}

export function ForgotPassword() {
  const [values, setValues] = useState<InputsValues>({email: ''});
  const { error, loading } = useAuth();

  function handleSubmit() {
    // signIn(values, "/dashboard")
  }

  return (
    <Wrapper>
      <strong>Esqueceu sua senha?</strong>
      <h3>Informe seu email para conseguirmos prosseguir<br/>com o a recuperacao da sua senha</h3>
      <InputText 
        title="E-mail" 
        isInvalid={error ? true : false}
        value={values.email ?? ''}
        onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
        placeholder="Digite seu e-mail aqui"
        type="email"
        />
        {error && error === "Usuário não foi encontrado" && <span>{error}</span>}
      <Button disabled={!values.email} onClick={handleSubmit} title={loading ? "Carregando..." : "Recuperar senha"} />
    </Wrapper>
  )
}

import { useState } from 'react'
import { AppProvider } from '../../contexts';
import { ForgotPassword } from './Components/ForgotPassword'
import { Login } from './Components/Login'
import { Wrapper } from './styled';

enum STEPS_LOGIN {
  login = "LOGIN", 
  forgot = "FORGOT",
} 
  

export function LoginComponent() {
  const [step, setStep] = useState<STEPS_LOGIN>(STEPS_LOGIN.login);

  function handleForgot() {
    setStep(() => STEPS_LOGIN.forgot)
  }

  return (
    <AppProvider>
      <Wrapper>
        {/* <InactiveUser /> */}
        {step === STEPS_LOGIN.login && <Login onClick={handleForgot} />}
        {step === STEPS_LOGIN.forgot && <ForgotPassword />}
        <p>SEUS GERENCIAMENTOS DE FORMA CENTRALIZADA!</p>
      </Wrapper>
    </AppProvider>
  )
}

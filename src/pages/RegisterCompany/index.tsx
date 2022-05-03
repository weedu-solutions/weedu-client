import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Wrapper, ButtonWrapper } from './styled'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { Button } from '../../components/Button'

export function RegisterCompany() {

  const initialForm = {
    razaoSocial: '',
    nomeFantasia: '',
    documento: '',
    nomeGestor: '',
    emailGestor: '',
    telefoneGestor: '',
    emailFinanceiro: '',
    numeroUsuarios: '',
  }

  interface IDataForm {
    razaoSocial: string;
    nomeFantasia: string;
    documento: string;
    nomeGestor: string;
    emailGestor: string;
    telefoneGestor: string;
    emailFinanceiro: string;
    numeroUsuarios: string;
  }

  const [ dataForm, setDataForm ] = useState<IDataForm>(initialForm)
  const navigate = useNavigate()

  return (
    <LayoutRegister>
      <strong>Cadastrar uma nova empresa</strong>
      <Wrapper>
        <InputText
          type="name"
          value={dataForm.razaoSocial ?? ''} 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, razaoSocial: String(event.target.value) })}
          title="Razão Social" 
          placeholder="Informe a razão social"
        />
        <InputText 
          onChange={(event: any) => setDataForm({ ...dataForm, nomeFantasia: String(event.target.value) })}
          title="Nome Fantasia" 
          placeholder="Informe o nome fantasia"
          type="text"
        />
        <InputText 
          title="CPF/CNPJ" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, documento: String(event.target.value) })}
          placeholder="Digite um CPF ou CNPJ"
          type="text"
        />
        <InputText 
          title="Nome do Gestor" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, nomeGestor: String(event.target.value) })}
          placeholder="Agora digite o nome do Gestor"
          type="text"
        />
        <InputText 
          title="E-mail do Gestor" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, emailGestor: String(event.target.value) })}
          placeholder="Agora digite o e-mail do Gestor"
          type="email"
        />
        <InputText 
          title="Telefone do Gestor" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, telefoneGestor: String(event.target.value) })}
          placeholder="Digite o telefone do Gestor"
          type="email"
        />
        <InputText 
          title="E-mail do Financeiro" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, emailFinanceiro: String(event.target.value) })}
          placeholder="Agora digite o e-mail do Financeiro"
          type="email"
        />
        <InputText 
          title="Número máximo de usuários" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, numeroUsuarios: String(event.target.value) })}
          placeholder="Escolha um número máximo de usuários"
          type="text"
        />
        <ButtonWrapper>
          <Button customColor="#646170" customSize="40%" onClick={() => navigate(-1)} title={'Cancelar'} />
          <Button customStyles="margin-left:30px;" customSize="40%" title={'Cadastrar'} />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  )
}

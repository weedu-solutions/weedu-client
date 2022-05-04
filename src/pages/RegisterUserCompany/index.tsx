import { Label, CustomInput, Wrapper, ButtonWrapper } from './styled'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { Button } from '../../components/Button'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function RegisterUserCompany() {

  const initialForm = {
    company_name: '',
    fantasy_name: '',
    cpf_cnpj: '',
    maneger_name: '',
    maneger_email: '',
    maneger_telephone: '',
    financial_email: '',
    status: 'ok',
    number_of_users: '',
  }

  interface IDataForm {
    company_name: string;
    fantasy_name: string;
    cpf_cnpj: string;
    maneger_name: string;
    maneger_email: string;
    maneger_telephone: string;
    financial_email: string;
    status: string;
    number_of_users: string;
  }

  const selectCustomStyles = {
    container: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any) => ({
      ...provided,
      padding: '10px 0'
    }),
  }

  const navigate = useNavigate()
  const [ dataForm, setDataForm ] = useState<IDataForm>(initialForm)

  return (
    <LayoutRegister>
      <strong>Cadastrar usuário da empresa</strong>
      <Wrapper>
        <InputText 
          title="Nome" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
          placeholder="Digite seu nome"
          type="text"
        />
        <InputText 
          title="Sobrenome" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
          placeholder="Agora seu sobrenome"
          type="text"
        />
        <InputText 
          title="Telefone" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
          placeholder="Digite seu telefone"
          type="tel"
        />
        <InputText 
          title="E-mail" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
          placeholder="Agora digite seu e-mail"
          type="email"
        />
        <Label htmlFor="">Tipo de perfil</Label>
        <CustomInput>
          <Select
            styles={selectCustomStyles}
            options={[
              { value: 1, label: 'Colaborador' },
              { value: 2, label: 'Gestor' },
            ]}
          />
        </CustomInput>
        <InputText 
          title="Senha" 
          // isInvalid={error ? true : false}
          // value={values.email ?? ''}
          // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
          placeholder="Escolha uma senha"
          type="email"
        />
        <InputText
          isDisabled
          title="ID da empresa" 
          // isInvalid={error ? true : false}
          value={10}
          // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
          placeholder="Escolha uma senha"
          type="email"
        />
        <ButtonWrapper>
          <Button customColor="#646170" onClick={() => navigate(-1)} customSize="40%" title={'Cancelar'} />
          <Button customStyles="margin-left:30px;" customSize="40%" title={'Cadastrar'} />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  )
}

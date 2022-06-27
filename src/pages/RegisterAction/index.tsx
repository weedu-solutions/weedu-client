/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Wrapper, ButtonWrapper, CustomInput, Label, InputWrapper } from './styled'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { Button } from '../../components/Button'
import { CustomerServices } from '../../services/customer'
import { ROUTES } from '../../constants/routes'
import Select from 'react-select'
import { useUser } from '../../hooks/user'

export function RegisterAction() {

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

  const selectCustomStyles = {
    container: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any) => ({
      ...provided,
      padding: '10px 0'
    }),
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

  const [dataForm, setDataForm] = useState<IDataForm>(initialForm)

  const [isError, setIsError] = useState<boolean>(false)
  const { userDataList } = useUser()
  const navigate = useNavigate()

  const manegerOptions = userDataList.map((user) => {
    return { label: user.name, value: String(user.user_type_id), id: user.id }
  }) as any

  async function handleCreateCompany() {
    const { data } = await CustomerServices.createCustomer(dataForm)
    if (data === "cpf_cnpj invalid") return setIsError(true)
    navigate(ROUTES.CUSTOMERS)
  }

  return (
    <LayoutRegister>
      <strong>Adicionar uma nova acao</strong>
      <Wrapper>
        <InputText
          title="Qual o problema que será tratado?"
          placeholder="Informe a razão social"
          value={dataForm.company_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, company_name: String(event.target.value) })}
          type="name"
        />
        <InputText
          title="Porque 1"
          placeholder="Informe o nome fantasia"
          value={dataForm.fantasy_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, fantasy_name: String(event.target.value) })}
          type="text"
        />
        <InputText
          title="Porque 2"
          placeholder="Informe o nome fantasia"
          value={dataForm.fantasy_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, fantasy_name: String(event.target.value) })}
          type="text"
        />
        <InputText
          title="Porque 3"
          placeholder="Informe o nome fantasia"
          value={dataForm.fantasy_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, fantasy_name: String(event.target.value) })}
          type="text"
        />
        <InputText
          title="Porque 4"
          placeholder="Informe o nome fantasia"
          value={dataForm.fantasy_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, fantasy_name: String(event.target.value) })}
          type="text"
        />
        <InputText
          title="Porque 5"
          placeholder="Informe o nome fantasia"
          value={dataForm.fantasy_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, fantasy_name: String(event.target.value) })}
          type="text"
        />
        <InputText
          title="O que será feito? (What?)"
          placeholder="Agora digite o e-mail do Gestor"
          value={dataForm.maneger_email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, maneger_email: String(event.target.value) })}
          type="email"
        />
        <InputText
          title="Como irá realizar esta ação (passo a passo)? (How?)"
          placeholder="Digite o telefone do Gestor"
          value={dataForm.maneger_telephone ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, maneger_telephone: String(event.target.value) })}
          type="email"
        />
        <InputText
          title="Responsável pela ação (Who?)"
          placeholder="Agora digite o e-mail do Financeiro"
          value={dataForm.financial_email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, financial_email: String(event.target.value) })}
          type="email"
        />
        <Label htmlFor="">Gestor</Label>
        <CustomInput>
          <Select
            styles={selectCustomStyles}
            options={manegerOptions}
            // defaultValue={dataForm.user_type_id}
            placeholder="Nome de quem preencheu"
          />
        </CustomInput>
        <InputWrapper>
          <InputText
            customWidth='48%'
            title="Início previsto (When?)"
            placeholder="Escolha um número máximo de usuários"
            value={dataForm.number_of_users ?? ''}
            onChange={(event: any) => setDataForm({ ...dataForm, number_of_users: String(event.target.value) })}
            type="text"
          />
          <InputText
            customWidth='48%'
            title="Fim previsto (When?)"
            placeholder="Escolha um número máximo de usuários"
            value={dataForm.number_of_users ?? ''}
            onChange={(event: any) => setDataForm({ ...dataForm, number_of_users: String(event.target.value) })}
            type="text"
          />
        </InputWrapper>
        <InputText
          title="Observações"
          placeholder="Escolha um número máximo de usuários"
          value={dataForm.number_of_users ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, number_of_users: String(event.target.value) })}
          type="text"
        />
        <ButtonWrapper>
          <Button customColor="#646170" customSize="40%" onClick={() => navigate(-1)} title={'Cancelar'} />
          <Button customStyles="margin-left:30px;" onClick={handleCreateCompany} customSize="40%" title={'Cadastrar'} />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  )
}

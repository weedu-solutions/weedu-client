import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Wrapper, ButtonWrapper } from './styled'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { Button } from '../../components/Button'
import { CustomerServices } from '../../services/customer'
import { ROUTES } from '../../constants/routes'
import { Notify, NotifyTypes } from '../../components/Notify'

export function RegisterCompany() {

  const initialForm = {
    company_name: '',
    fantasy_name: '',
    cpf_cnpj: '',
    maneger_name: '',
    maneger_email: '',
    maneger_telephone: '',
    financial_email: '',
    status: '1',
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

  const [dataForm, setDataForm] = useState<IDataForm>(initialForm)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  async function handleCreateCompany() {
    const { data } = await CustomerServices.createCustomer(dataForm)
    if (data === "cpf_cnpj invalid") return setIsError(true)

    if (data) {
      navigate(ROUTES.CUSTOMERS)
      Notify(NotifyTypes.SUCCESS, 'Empresa cadastrada com sucesso!')
    }

  }

  return (
    <LayoutRegister>
      <strong>Cadastrar uma nova empresa</strong>
      <Wrapper>
        <InputText
          type="name"
          value={dataForm.company_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, company_name: String(event.target.value) })}
          title="Razão Social"
          placeholder="Informe a razão social"
        />
        <InputText
          value={dataForm.fantasy_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, fantasy_name: String(event.target.value) })}
          title="Nome Fantasia"
          placeholder="Informe o nome fantasia"
          type="text"
        />
        <InputText
          title="CPF/CNPJ"
          isInvalid={!!isError}
          value={dataForm.cpf_cnpj ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, cpf_cnpj: String(event.target.value) })}
          placeholder="Digite um CPF ou CNPJ"
          type="text"
        />
        {isError && <span>Documento inválido, tente novamente!</span>}
        <InputText
          title="Nome do Gestor"
          value={dataForm.maneger_name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, maneger_name: String(event.target.value) })}
          placeholder="Agora digite o nome do Gestor"
          type="text"
        />
        <InputText
          title="E-mail do Gestor"
          value={dataForm.maneger_email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, maneger_email: String(event.target.value) })}
          placeholder="Agora digite o e-mail do Gestor"
          type="email"
        />
        <InputText
          title="Telefone do Gestor"
          value={dataForm.maneger_telephone ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, maneger_telephone: String(event.target.value) })}
          placeholder="Digite o telefone do Gestor"
          type="email"
        />
        <InputText
          title="E-mail do Financeiro"
          value={dataForm.financial_email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, financial_email: String(event.target.value) })}
          placeholder="Agora digite o e-mail do Financeiro"
          type="email"
        />
        <InputText
          title="Número máximo de usuários"
          value={dataForm.number_of_users ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, number_of_users: String(event.target.value) })}
          placeholder="Escolha um número máximo de usuários"
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
